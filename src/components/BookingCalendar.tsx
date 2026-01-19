import { useState, useEffect } from 'react';

interface TimeSlot {
  start: string;
  end: string;
  display: string;
}

interface BookingCalendarProps {
  onSlotSelect?: (slot: { start: string; end: string }) => void;
  selectedSlot?: { start: string; end: string } | null;
}

export default function BookingCalendar({ onSlotSelect, selectedSlot: selectedSlotProp }: BookingCalendarProps = {}) {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState<{ start: string; end: string } | null>(null);

  // Initialize with tomorrow's date
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    // Use formatDateString helper to avoid UTC conversion
    const year = tomorrow.getFullYear();
    const month = (tomorrow.getMonth() + 1).toString().padStart(2, '0');
    const day = tomorrow.getDate().toString().padStart(2, '0');
    setSelectedDate(`${year}-${month}-${day}`);
  }, []);

  // Fetch slots when date changes
  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots(selectedDate);
      // Clear selected slot when date changes
      setSelectedSlot(null);
      (window as any).selectedBookingSlot = null;
    }
  }, [selectedDate]);

  const fetchAvailableSlots = async (date: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/availability?date=${date}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch availability');
      }

      setAvailableSlots(data.slots || []);

      if (data.slots.length === 0 && data.message) {
        setError(data.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load availability');
      setAvailableSlots([]);
    } finally {
      setLoading(false);
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = (firstDay.getDay() + 6) % 7; // Monday = 0

    const days = [];
    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    // Add actual days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    return days;
  };

  const isDateDisabled = (date: Date | null) => {
    if (!date) return true;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const formatDateString = (date: Date) => {
    // Format date in local timezone to avoid UTC conversion issues
    // When user clicks Jan 28, we want "2026-01-28", not "2026-01-27"
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleDateClick = (date: Date) => {
    if (isDateDisabled(date)) return;
    setSelectedDate(formatDateString(date));
  };

  const handleSlotClick = (slot: TimeSlot) => {
    const slotData = {
      start: slot.start,
      end: slot.end
    };

    // Update internal state to show selection
    setSelectedSlot(slotData);

    // Save to window for form submission
    (window as any).selectedBookingSlot = slotData;

    // Call prop function if provided
    if (onSlotSelect) {
      onSlotSelect(slotData);
    }

    // Dispatch custom event for parent to listen
    window.dispatchEvent(new CustomEvent('slotSelected', { detail: slotData }));
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const days = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleDateString('nl-NL', { month: 'long', year: 'numeric' });

  return (
    <div className="booking-calendar">
      {/* Calendar Month View */}
      <div className="calendar-header">
        <button
          type="button"
          onClick={goToPreviousMonth}
          className="calendar-nav-btn"
          aria-label="Vorige maand"
        >
          ←
        </button>
        <h3 className="calendar-month">{monthName}</h3>
        <button
          type="button"
          onClick={goToNextMonth}
          className="calendar-nav-btn"
          aria-label="Volgende maand"
        >
          →
        </button>
      </div>

      {/* Day labels */}
      <div className="calendar-grid">
        {['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'].map(day => (
          <div key={day} className="calendar-day-label">
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {days.map((date, index) => {
          const isDisabled = isDateDisabled(date);
          const isSelected = date && selectedDate === formatDateString(date);

          return (
            <button
              key={index}
              type="button"
              onClick={() => date && handleDateClick(date)}
              disabled={isDisabled || !date}
              className={`calendar-day ${isSelected ? 'selected' : ''} ${isDisabled || !date ? 'disabled' : ''}`}
            >
              {date ? date.getDate() : ''}
            </button>
          );
        })}
      </div>

      {/* Time slots */}
      {selectedDate && (
        <div className="time-slots-container">
          <h4 className="time-slots-title">
            Beschikbare tijden op {new Date(selectedDate).toLocaleDateString('nl-NL', {
              weekday: 'long',
              day: 'numeric',
              month: 'long'
            })}
          </h4>

          {loading && (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Beschikbaarheid laden...</p>
            </div>
          )}

          {error && !loading && (
            <div className="error-state">
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && availableSlots.length === 0 && (
            <div className="no-slots-state">
              <p>Geen beschikbare tijden op deze dag. Kies een andere datum.</p>
            </div>
          )}

          {!loading && availableSlots.length > 0 && (
            <div className="time-slots-grid">
              {availableSlots.map((slot, index) => {
                const isSelected = selectedSlot &&
                  selectedSlot.start === slot.start &&
                  selectedSlot.end === slot.end;

                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSlotClick(slot)}
                    className={`time-slot ${isSelected ? 'selected' : ''}`}
                  >
                    {slot.display}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      <style>{`
        .booking-calendar {
          width: 100%;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 1.5rem;
        }

        .calendar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }

        .calendar-month {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--color-canvas);
          text-transform: capitalize;
        }

        .calendar-nav-btn {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: var(--color-canvas);
          width: 40px;
          height: 40px;
          border-radius: 8px;
          font-size: 1.25rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .calendar-nav-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: var(--color-acid);
        }

        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 0.5rem;
          margin-bottom: 2rem;
        }

        .calendar-day-label {
          text-align: center;
          font-size: 0.875rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.6);
          padding: 0.5rem;
        }

        .calendar-day {
          aspect-ratio: 1;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--color-canvas);
          border-radius: 8px;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .calendar-day:not(.disabled):hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: var(--color-acid);
        }

        .calendar-day.selected {
          background: var(--color-acid);
          border-color: var(--color-acid);
          color: var(--color-ink);
          font-weight: 600;
        }

        .calendar-day.disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .time-slots-container {
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .time-slots-title {
          font-size: 1rem;
          font-weight: 600;
          color: var(--color-canvas);
          margin-bottom: 1rem;
        }

        .time-slots-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
          gap: 0.75rem;
        }

        .time-slot {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: var(--color-canvas);
          padding: 0.75rem;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .time-slot:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: var(--color-acid);
        }

        .time-slot.selected {
          background: var(--color-acid);
          border-color: var(--color-acid);
          color: var(--color-ink);
          font-weight: 600;
        }

        .loading-state,
        .error-state,
        .no-slots-state {
          text-align: center;
          padding: 2rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(255, 255, 255, 0.1);
          border-top-color: var(--color-acid);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 1rem;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .error-state {
          color: #ff6b6b;
        }

        @media (max-width: 640px) {
          .booking-calendar {
            padding: 1rem;
          }

          .calendar-month {
            font-size: 1rem;
          }

          .calendar-day {
            font-size: 0.75rem;
          }

          .time-slots-grid {
            grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
            gap: 0.5rem;
          }

          .time-slot {
            padding: 0.5rem;
            font-size: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
}
