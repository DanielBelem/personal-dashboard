import { useEffect, useState } from 'react';

import AddEventForm from './addEventForm';

import {
  createEvent,
  deleteEvent,
  getEvents,
} from '../../services/events';

const days = [
  { value: 1, label: 'Monday' },
  { value: 2, label: 'Tuesday' },
  { value: 3, label: 'Wednesday' },
  { value: 4, label: 'Thursday' },
  { value: 5, label: 'Friday' },
  { value: 6, label: 'Saturday' },
  { value: 7, label: 'Sunday' },
];

function formatTime(time) {
  if (!time) {
    return '';
  }

  return time.slice(0, 5);
}

function getDateWeekday(dateString) {
  const date = new Date(`${dateString}T00:00:00`);

  const jsDay = date.getDay();

  return jsDay === 0 ? 7 : jsDay;
}

function isDateInCurrentWeek(dateString) {
  if (!dateString) {
    return false;
  }

  const eventDate = new Date(`${dateString}T00:00:00`);
  const today = new Date();

  const currentDay = today.getDay();
  const daysSinceMonday =
    currentDay === 0 ? 6 : currentDay - 1;

  const monday = new Date(today);

  monday.setHours(0, 0, 0, 0);
  monday.setDate(today.getDate() - daysSinceMonday);

  const sunday = new Date(monday);

  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  return eventDate >= monday && eventDate <= sunday;
}

function ScheduleSection({ user }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [showAddForm, setShowAddForm] =
    useState(false);

  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await getEvents();

        setEvents(data);
      } catch (error) {
        console.error(error);
        setError('Failed to load events.');
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, []);

  async function handleAddEvent(eventData) {
    try {
      setError('');

      const newEvent = await createEvent(
        user.id,
        eventData,
      );

      setEvents((currentEvents) => [
        ...currentEvents,
        newEvent,
      ]);

      setShowAddForm(false);
    } catch (error) {
      console.error(error);
      setError('Failed to add event.');

      throw error;
    }
  }

  async function handleDeleteEvent(eventId) {
    try {
      setError('');

      await deleteEvent(eventId);

      setEvents((currentEvents) =>
        currentEvents.filter(
          (eventItem) => eventItem.id !== eventId,
        ),
      );
    } catch (error) {
      console.error(error);
      setError('Failed to delete event.');
    }
  }

  return (
    <>
      <section className="rounded-2xl border border-neutral-200 bg-slate-200 p-6">
        <div className="mb-6 grid grid-cols-3 items-center">
          <div />

          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Schedule
            </p>

            <h2 className="mt-1 text-2xl font-semibold">
              Planned Activities
            </h2>
          </div>

          <button
            onClick={() => setShowAddForm(true)}
            className="justify-self-end rounded-full bg-green-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
          >
            Add event
          </button>
        </div>

        {loading && (
          <p className="text-sm text-neutral-500">
            Loading events...
          </p>
        )}

        {error && (
          <p className="mb-4 text-sm text-red-600">
            {error}
          </p>
        )}

        {!loading && (
          <div className="grid gap-4 md:grid-cols-7">
            {days.map((day) => {
              const dayEvents = events
                .filter((eventItem) => {
                  if (eventItem.recurring) {
                    return (
                      eventItem.weekday === day.value
                    );
                  }

                  return (
                    isDateInCurrentWeek(
                      eventItem.date,
                    ) &&
                    getDateWeekday(eventItem.date) ===
                      day.value
                  );
                })
                .sort((a, b) =>
                  a.start_time.localeCompare(
                    b.start_time,
                  ),
                );

              return (
                <div
                  key={day.value}
                  className="min-h-52 rounded-2xl border border-neutral-200 bg-neutral-50 p-4"
                >
                  <h3 className="mb-1 mt-5 text-center font-semibold">
                    {day.label}
                  </h3>

                  <div className="mt-8 space-y-6 text-center">
                    {dayEvents.length === 0 ? (
                      <p className="text-sm text-neutral-400">
                        No events
                      </p>
                    ) : (
                      dayEvents.map((eventItem) => (
                        <article
                          key={eventItem.id}
                          className="group rounded-2xl border border-neutral-200 bg-white p-3 flex start-items justify-between"
                        >
                          <div className="text-neutral-700">
                              {eventItem.name}
                          </div>

                          <p className="mt-1 text-sm font-medium">
                            {formatTime(
                              eventItem.start_time,
                            )}

                            {eventItem.end_time && (
                              <>
                                {' '}
                                –{' '}
                                {formatTime(
                                  eventItem.end_time,
                                )}
                              </>
                            )}
                          </p>
                           <button
                              onClick={() =>
                                handleDeleteEvent(
                                  eventItem.id,
                                )
                              }
                              className="text-xs text-neutral-400 transition hover:text-red-600 group-hover:opacity-100"
                              title="Delete event"
                            >
                              ✕
                            </button>

                        </article>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {showAddForm && (
        <AddEventForm
          onSubmit={handleAddEvent}
          onCancel={() =>
            setShowAddForm(false)
          }
        />
      )}
    </>
  );
}

export default ScheduleSection;