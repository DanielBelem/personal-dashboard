import { useEffect, useState } from 'react';

import { getClasses } from '../../services/classes';

const days = [
  { value: 1, label: 'Monday' },
  { value: 2, label: 'Tuesday' },
  { value: 3, label: 'Wednesday' },
  { value: 4, label: 'Thursday' },
  { value: 5, label: 'Friday' },
];

function formatTime(time) {
  return time.slice(0, 5);
}

function ScheduleSection() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadClasses() {
      try {
        const data = await getClasses();

        setClasses(data);
      } catch (error) {
        console.error(error);
        setError('Failed to load classes.');
      } finally {
        setLoading(false);
      }
    }

    loadClasses();
  }, []);

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Schedule
          </p>

          <h2 className="mt-1 text-2xl font-semibold">
            Weekly classes
          </h2>
        </div>

        <button className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white">
          Add class
        </button>
      </div>

      {loading && (
        <p className="text-sm text-neutral-500">
          Loading classes...
        </p>
      )}

      {error && (
        <p className="text-sm text-red-600">
          {error}
        </p>
      )}

      {!loading && !error && (
        <div className="grid gap-4 md:grid-cols-5">
          {days.map((day) => {
            const dayClasses = classes.filter(
              (classItem) => classItem.weekday === day.value,
            );

            return (
              <div
                key={day.value}
                className="min-h-52 rounded-xl border border-neutral-200 bg-neutral-50 p-4"
              >
                <h3 className="mb-4 font-semibold">
                  {day.label}
                </h3>

                <div className="space-y-3">
                  {dayClasses.length === 0 ? (
                    <p className="text-sm text-neutral-400">
                      No classes
                    </p>
                  ) : (
                    dayClasses.map((classItem) => (
                      <article
                        key={classItem.id}
                        className="rounded-lg border border-neutral-200 bg-white p-3"
                      >
                        <p className="font-medium">
                          {classItem.subject}
                        </p>

                        <p className="mt-1 text-sm text-neutral-500">
                            {formatTime(classItem.start_time)} – {formatTime(classItem.end_time)}
                        </p>

                        <div className="mt-3 flex justify-between text-xs text-neutral-400">
                          <span>{classItem.room}</span>
                          <span>{classItem.class_type}</span>
                        </div>
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
  );
}

export default ScheduleSection;