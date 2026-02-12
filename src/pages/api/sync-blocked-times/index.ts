import type { APIRoute } from 'astro';

interface Env {
  knapgemaakt_bookings: D1Database;
  API_SECRET_TOKEN?: string;
}

interface BlockedTime {
  id: string;
  start_time: string;
  end_time: string;
  source: string;
  calendar_event_id: string;
}

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    // Authenticate request
    const authHeader = request.headers.get('Authorization');
    const apiSecret = (locals.runtime.env as Env).API_SECRET_TOKEN;

    if (!authHeader || !apiSecret) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const token = authHeader.replace('Bearer ', '');
    if (token !== apiSecret) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const body: { blocked_times: BlockedTime[] } = await request.json();

    if (!body.blocked_times || !Array.isArray(body.blocked_times)) {
      return new Response(JSON.stringify({ error: 'Invalid request body' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const db = (locals.runtime.env as Env).knapgemaakt_bookings;

    // Delete old blocked times from Google Calendar (older than current sync)
    await db.prepare(
      "DELETE FROM blocked_times WHERE source = 'google_calendar'"
    ).run();

    // Insert new blocked times
    let insertedCount = 0;
    for (const blockedTime of body.blocked_times) {
      try {
        await db.prepare(`
          INSERT INTO blocked_times (id, start_time, end_time, source, calendar_event_id, synced_at)
          VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
        `).bind(
          blockedTime.id,
          blockedTime.start_time,
          blockedTime.end_time,
          blockedTime.source || 'google_calendar',
          blockedTime.calendar_event_id
        ).run();
        insertedCount++;
      } catch (err) {
        console.error('Error inserting blocked time:', err);
        // Continue with other entries if one fails
      }
    }

    return new Response(JSON.stringify({
      success: true,
      synced: insertedCount,
      total: body.blocked_times.length,
      message: `Synced ${insertedCount} blocked times`
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error syncing blocked times:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
