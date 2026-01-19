import type { APIRoute } from 'astro';

interface Env {
  knapgemaakt_bookings: D1Database;
  N8N_BOOKING_WEBHOOK?: string;
}

interface BookingRequest {
  user_name: string;
  user_email: string;
  user_phone: string;
  user_company?: string;
  user_industry?: string;
  start_time: string;
  end_time: string;
}

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body: BookingRequest = await request.json();

    // Validate required fields
    if (!body.user_name || !body.user_email || !body.user_phone || !body.start_time || !body.end_time) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.user_email)) {
      return new Response(JSON.stringify({ error: 'Invalid email format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate dates
    const startTime = new Date(body.start_time);
    const endTime = new Date(body.end_time);

    if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
      return new Response(JSON.stringify({ error: 'Invalid date format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (startTime >= endTime) {
      return new Response(JSON.stringify({ error: 'End time must be after start time' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check if booking is in the future
    const now = new Date();
    if (startTime < now) {
      return new Response(JSON.stringify({ error: 'Cannot book in the past' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const db = (locals.runtime.env as Env).knapgemaakt_bookings;

    // Check for conflicts with existing bookings
    const conflicts = await db.prepare(`
      SELECT id FROM bookings
      WHERE status = 'confirmed'
      AND start_time < ?
      AND end_time > ?
    `).bind(endTime.toISOString(), startTime.toISOString()).all();

    if (conflicts.results.length > 0) {
      return new Response(JSON.stringify({
        error: 'This time slot is no longer available. Please select another time.'
      }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check for conflicts with blocked times
    const blockedConflicts = await db.prepare(`
      SELECT id FROM blocked_times
      WHERE start_time < ?
      AND end_time > ?
    `).bind(endTime.toISOString(), startTime.toISOString()).all();

    if (blockedConflicts.results.length > 0) {
      return new Response(JSON.stringify({
        error: 'This time slot was just blocked. Please select another time.'
      }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Create booking (use Web Crypto API available in Cloudflare Workers)
    const bookingId = crypto.randomUUID();

    await db.prepare(`
      INSERT INTO bookings (
        id, user_name, user_email, user_phone, user_company, user_industry,
        start_time, end_time, status, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'confirmed', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `).bind(
      bookingId,
      body.user_name,
      body.user_email,
      body.user_phone,
      body.user_company || null,
      body.user_industry || null,
      startTime.toISOString(),
      endTime.toISOString()
    ).run();

    // Trigger n8n webhook (fire-and-forget)
    const webhookUrl = (locals.runtime.env as Env).N8N_BOOKING_WEBHOOK;
    console.log('[Bookings API] Webhook URL:', webhookUrl ? 'found' : 'NOT FOUND');

    if (webhookUrl) {
      console.log('[Bookings API] Triggering webhook for booking:', bookingId);
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          booking_id: bookingId,
          user_name: body.user_name,
          user_email: body.user_email,
          user_phone: body.user_phone,
          user_company: body.user_company,
          user_industry: body.user_industry,
          start_time: startTime.toISOString(),
          end_time: endTime.toISOString(),
          created_at: new Date().toISOString()
        })
      })
      .then(() => console.log('[Bookings API] Webhook triggered successfully'))
      .catch(err => {
        console.error('[Bookings API] Failed to trigger n8n webhook:', err);
        // Don't fail the booking if webhook fails
      });
    } else {
      console.warn('[Bookings API] N8N_BOOKING_WEBHOOK environment variable not set - skipping webhook');
    }

    return new Response(JSON.stringify({
      success: true,
      booking_id: bookingId,
      start_time: startTime.toISOString(),
      end_time: endTime.toISOString(),
      message: 'Booking confirmed! You will receive a confirmation email shortly.'
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error creating booking:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const GET: APIRoute = async ({ url, locals }) => {
  const bookingId = url.searchParams.get('id');

  if (!bookingId) {
    return new Response(JSON.stringify({ error: 'Booking ID required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const db = (locals.runtime.env as Env).knapgemaakt_bookings;
    const booking = await db.prepare(
      'SELECT * FROM bookings WHERE id = ?'
    ).bind(bookingId).first();

    if (!booking) {
      return new Response(JSON.stringify({ error: 'Booking not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify(booking), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error fetching booking:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
