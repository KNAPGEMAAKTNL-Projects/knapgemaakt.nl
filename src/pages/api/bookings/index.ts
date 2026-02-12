import type { APIRoute } from 'astro';
import { createBooking } from '../../lib/create-booking';

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
  user_website?: string;
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

    const db = (locals.runtime.env as Env).knapgemaakt_bookings;

    const result = await createBooking(db, body);

    if (!result.success) {
      return new Response(JSON.stringify({ error: result.error }), {
        status: result.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Trigger n8n webhook
    const webhookUrl = (locals.runtime.env as Env).N8N_BOOKING_WEBHOOK;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            booking_id: result.booking_id,
            user_name: body.user_name,
            user_email: body.user_email,
            user_phone: body.user_phone,
            user_company: body.user_company,
            user_industry: body.user_industry,
            user_website: body.user_website,
            start_time: result.start_time,
            end_time: result.end_time,
            created_at: new Date().toISOString()
          })
        });
      } catch (err) {
        console.error('[Bookings API] Failed to trigger n8n webhook:', err);
      }
    }

    return new Response(JSON.stringify({
      success: true,
      booking_id: result.booking_id,
      start_time: result.start_time,
      end_time: result.end_time,
      message: 'Booking confirmed!'
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
