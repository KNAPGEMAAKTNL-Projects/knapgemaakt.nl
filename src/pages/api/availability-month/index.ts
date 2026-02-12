import type { APIRoute } from 'astro';
import availabilityConfig from '../../config/availability.json';

interface Env {
  knapgemaakt_bookings: D1Database;
}

export const GET: APIRoute = async ({ request, locals }) => {
  try {
    const url = new URL(request.url);
    const year = parseInt(url.searchParams.get('year') || '');
    const month = parseInt(url.searchParams.get('month') || ''); // 1-12

    if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
      return new Response(JSON.stringify({ error: 'Valid year and month parameters required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get database binding from runtime
    const db = (locals.runtime.env as Env).knapgemaakt_bookings;

    // Calculate month start and end
    const monthStart = new Date(year, month - 1, 1, 0, 0, 0, 0);
    const monthEnd = new Date(year, month, 0, 23, 59, 59, 999);

    // Fetch all bookings that overlap with this month
    // Use overlap detection: event overlaps month if (start < monthEnd AND end > monthStart)
    const bookings = await db.prepare(
      'SELECT start_time, end_time FROM bookings WHERE status = ? AND datetime(start_time) <= datetime(?) AND datetime(end_time) >= datetime(?)'
    ).bind('confirmed', monthEnd.toISOString(), monthStart.toISOString()).all();

    // Fetch all blocked times that overlap with this month
    // Use overlap detection: blocked time overlaps month if (start < monthEnd AND end > monthStart)
    const blockedTimes = await db.prepare(
      'SELECT start_time, end_time FROM blocked_times WHERE datetime(start_time) <= datetime(?) AND datetime(end_time) >= datetime(?)'
    ).bind(monthEnd.toISOString(), monthStart.toISOString()).all();

    return new Response(JSON.stringify({
      year,
      month,
      bookings: bookings.results.map((b: any) => ({
        start: b.start_time,
        end: b.end_time
      })),
      blockedTimes: blockedTimes.results.map((bt: any) => ({
        start: bt.start_time,
        end: bt.end_time
      })),
      config: {
        businessHours: availabilityConfig.businessHours,
        slotDuration: availabilityConfig.slotDuration,
        minAdvanceBooking: availabilityConfig.minAdvanceBooking,
        maxAdvanceBooking: availabilityConfig.maxAdvanceBooking
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error fetching month availability:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
