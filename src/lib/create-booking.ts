import availabilityConfig from '../config/availability.json';

export interface BookingData {
  user_name: string;
  user_email: string;
  user_phone: string;
  user_company?: string;
  user_industry?: string;
  user_website?: string;
  start_time: string;
  end_time: string;
}

export interface BookingResult {
  success: true;
  booking_id: string;
  start_time: string;
  end_time: string;
}

export interface BookingError {
  success: false;
  error: string;
  status: number;
}

export async function createBooking(
  db: D1Database,
  data: BookingData
): Promise<BookingResult | BookingError> {
  const startTime = new Date(data.start_time);
  const endTime = new Date(data.end_time);

  if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
    return { success: false, error: 'Invalid date format', status: 400 };
  }

  if (startTime >= endTime) {
    return { success: false, error: 'End time must be after start time', status: 400 };
  }

  // Check minimum advance booking
  const now = new Date();
  const minBookingTime = new Date(now.getTime() + availabilityConfig.minAdvanceBooking * 60000);
  if (startTime < minBookingTime) {
    return {
      success: false,
      error: `Bookings must be made at least ${Math.floor(availabilityConfig.minAdvanceBooking / 60)} hours in advance`,
      status: 400
    };
  }

  // Check max advance booking
  const maxBookingDate = new Date(now.getTime() + availabilityConfig.maxAdvanceBooking * 24 * 60 * 60000);
  if (startTime > maxBookingDate) {
    return {
      success: false,
      error: `Bookings can only be made up to ${availabilityConfig.maxAdvanceBooking} days in advance`,
      status: 400
    };
  }

  // Check booking conflicts
  const conflicts = await db.prepare(`
    SELECT id FROM bookings
    WHERE status = 'confirmed'
    AND datetime(start_time) < datetime(?)
    AND datetime(end_time) > datetime(?)
  `).bind(endTime.toISOString(), startTime.toISOString()).all();

  if (conflicts.results.length > 0) {
    return {
      success: false,
      error: 'This time slot is no longer available. Please select another time.',
      status: 409
    };
  }

  // Check blocked times conflicts
  const blockedConflicts = await db.prepare(`
    SELECT id FROM blocked_times
    WHERE datetime(start_time) < datetime(?)
    AND datetime(end_time) > datetime(?)
  `).bind(endTime.toISOString(), startTime.toISOString()).all();

  if (blockedConflicts.results.length > 0) {
    return {
      success: false,
      error: 'This time slot was just blocked. Please select another time.',
      status: 409
    };
  }

  // Create booking
  const bookingId = crypto.randomUUID();

  await db.prepare(`
    INSERT INTO bookings (
      id, user_name, user_email, user_phone, user_company, user_industry, user_website,
      start_time, end_time, status, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'confirmed', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
  `).bind(
    bookingId,
    data.user_name,
    data.user_email,
    data.user_phone,
    data.user_company || null,
    data.user_industry || null,
    data.user_website || null,
    startTime.toISOString(),
    endTime.toISOString()
  ).run();

  return {
    success: true,
    booking_id: bookingId,
    start_time: startTime.toISOString(),
    end_time: endTime.toISOString()
  };
}
