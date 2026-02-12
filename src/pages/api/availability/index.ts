import type { APIRoute } from 'astro';
import availabilityConfig from '../../config/availability.json';

interface Env {
  knapgemaakt_bookings: D1Database;
}

export const GET: APIRoute = async ({ request, locals }) => {
  try {
    const url = new URL(request.url);
    const dateParam = url.searchParams.get('date');

    if (!dateParam) {
      return new Response(JSON.stringify({ error: 'Date parameter required (YYYY-MM-DD)' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const requestedDate = new Date(dateParam);
    if (isNaN(requestedDate.getTime())) {
      return new Response(JSON.stringify({ error: 'Invalid date format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get database binding from runtime
    const db = (locals.runtime.env as Env).knapgemaakt_bookings;

    // Get day of week (0 = Monday, 6 = Sunday)
    const dayOfWeek = (requestedDate.getDay() + 6) % 7;
    const dayNames = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const dayName = dayNames[dayOfWeek] as keyof typeof availabilityConfig.businessHours;

    // Check if this day is enabled
    const dayConfig = availabilityConfig.businessHours[dayName];
    if (!dayConfig.enabled) {
      return new Response(JSON.stringify({
        date: dateParam,
        slots: [],
        message: 'No availability on this day'
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Calculate booking time window
    const now = new Date();
    const minBookingTime = new Date(now.getTime() + availabilityConfig.minAdvanceBooking * 60000);
    const maxBookingDate = new Date(now.getTime() + availabilityConfig.maxAdvanceBooking * 24 * 60 * 60000);

    // Generate time slots based on business hours
    const slots = generateTimeSlots(
      requestedDate,
      dayConfig.start,
      dayConfig.end,
      availabilityConfig.slotDuration
    );

    // Get booked slots
    const startOfDay = new Date(requestedDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(requestedDate);
    endOfDay.setHours(23, 59, 59, 999);

    const bookedSlots = await db.prepare(
      'SELECT start_time, end_time FROM bookings WHERE status = ? AND datetime(start_time) >= datetime(?) AND datetime(start_time) < datetime(?)'
    ).bind('confirmed', startOfDay.toISOString(), endOfDay.toISOString()).all();

    // Get blocked times
    const blockedSlots = await db.prepare(
      'SELECT start_time, end_time FROM blocked_times WHERE datetime(start_time) >= datetime(?) AND datetime(start_time) < datetime(?)'
    ).bind(startOfDay.toISOString(), endOfDay.toISOString()).all();

    // Filter out unavailable slots (booked, blocked, too soon, or too far in advance)
    const availableSlots = slots.filter(slot => {
      const slotStart = slot.start;
      const slotEnd = slot.end;

      // Check if slot is too soon or too far in advance
      if (slotStart < minBookingTime.getTime() || slotStart > maxBookingDate.getTime()) {
        return false;
      }

      // Check if slot overlaps with any booking
      const isBooked = bookedSlots.results.some((booking: any) => {
        const bookingStart = new Date(booking.start_time).getTime();
        const bookingEnd = new Date(booking.end_time).getTime();
        return (slotStart < bookingEnd && slotEnd > bookingStart);
      });

      // Check if slot overlaps with any blocked time
      const isBlocked = blockedSlots.results.some((blocked: any) => {
        const blockedStart = new Date(blocked.start_time).getTime();
        const blockedEnd = new Date(blocked.end_time).getTime();
        return (slotStart < blockedEnd && slotEnd > blockedStart);
      });

      return !isBooked && !isBlocked;
    });

    return new Response(JSON.stringify({
      date: dateParam,
      slots: availableSlots.map(slot => ({
        start: new Date(slot.start).toISOString(),
        end: new Date(slot.end).toISOString(),
        display: formatTimeSlot(new Date(slot.start))
      }))
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error fetching availability:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

function generateTimeSlots(date: Date, startTime: string, endTime: string, duration: number) {
  const slots = [];
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);

  // Calculate timezone offset for Europe/Amsterdam on this date
  // CET (UTC+1) in winter, CEST (UTC+2) in summer
  const tzOffset = getAmsterdamOffset(date);

  // Create slot times in Amsterdam timezone by adjusting UTC date
  // For 09:00 CET (UTC+1): we need 08:00 UTC
  // For 09:00 CEST (UTC+2): we need 07:00 UTC
  const slotStart = new Date(Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    startHour,
    startMinute,
    0,
    0
  ) - tzOffset);

  const slotEnd = new Date(Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    endHour,
    endMinute,
    0,
    0
  ) - tzOffset);

  let current = slotStart.getTime();
  const end = slotEnd.getTime();

  while (current + (duration * 60000) <= end) {
    slots.push({
      start: current,
      end: current + (duration * 60000)
    });
    current += duration * 60000;
  }

  return slots;
}

/**
 * Calculate UTC offset for Europe/Amsterdam timezone on a given date
 * Returns offset in milliseconds
 * CET (winter): UTC+1 = 3600000ms
 * CEST (summer): UTC+2 = 7200000ms
 */
function getAmsterdamOffset(date: Date): number {
  const year = date.getFullYear();

  // DST starts: Last Sunday of March at 2am → 3am
  const marchLastSunday = getLastSundayOfMonth(year, 2); // Month 2 = March
  const dstStart = new Date(Date.UTC(year, 2, marchLastSunday, 1, 0, 0)); // 2am CET = 1am UTC

  // DST ends: Last Sunday of October at 3am → 2am
  const octoberLastSunday = getLastSundayOfMonth(year, 9); // Month 9 = October
  const dstEnd = new Date(Date.UTC(year, 9, octoberLastSunday, 1, 0, 0)); // 3am CEST = 1am UTC

  const dateTime = date.getTime();

  // If date is between last Sunday of March and last Sunday of October: CEST (UTC+2)
  if (dateTime >= dstStart.getTime() && dateTime < dstEnd.getTime()) {
    return 7200000; // UTC+2 (CEST)
  }

  // Otherwise: CET (UTC+1)
  return 3600000; // UTC+1 (CET)
}

/**
 * Get the day number of the last Sunday of a given month
 */
function getLastSundayOfMonth(year: number, month: number): number {
  const lastDay = new Date(year, month + 1, 0); // Last day of the month
  const lastDayOfWeek = lastDay.getDay(); // 0 = Sunday
  const lastDayDate = lastDay.getDate();

  // If last day is Sunday, return it; otherwise, go back to previous Sunday
  if (lastDayOfWeek === 0) {
    return lastDayDate;
  }
  return lastDayDate - lastDayOfWeek;
}

function formatTimeSlot(date: Date): string {
  // Convert UTC time to Amsterdam time for display
  const tzOffset = getAmsterdamOffset(date);
  const amsterdamTime = new Date(date.getTime() + tzOffset);

  const hours = amsterdamTime.getUTCHours().toString().padStart(2, '0');
  const minutes = amsterdamTime.getUTCMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}
