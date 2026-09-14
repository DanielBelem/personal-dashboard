import { useEffect, useState } from 'react';
import AddClassForm from './addClassForm';

import { createClass, deleteClass, getClasses } from '../../services/classes';

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
function ScheduleSection({ user }) {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [showAddForm, setShowAddForm] = useState(false);

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

  async function handleAddClass(classData) {
    const newClass = await createClass(user.id, classData);

    setClasses((currentClasses) => [...currentClasses, newClass]);

    setShowAddForm(false);
  }

  async function handleDeleteClass(classId) {
    try {
      await deleteClass(classId);

      setClasses((currentClasses) =>
        currentClasses.filter((classItem) => classItem.id !== classId),
      );
    } catch (error) {
      console.error(error);
      setError('Failed to delete class.');
    }
  }

  return (
    <>
      <section className="rounded-2xl border border-olive-200 bg-slate-200 p-6">
        <div className="mb-6 grid grid-cols-3 items-center"><div />
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
            className="justify-self-end rounded-full bg-green-900 px-4 py-2 text-sm font-medium text-white border-olive-300 transition hover:bg-green-700"
          >
            Add class
          </button>
          </div>

        {loading && (
          <p className="text-sm text-neutral-500">Loading classes...</p>
        )}

        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

        {!loading && (
          <div className="grid gap-4 md:grid-cols-5">
            {days.map((day) => {
              const dayClasses = classes.filter(
                (classItem) => classItem.weekday === day.value,
              );

              return (
                <div
                  key={day.value}
                  className="min-h-52 rounded-2xl border border-olive-200 bg-neutral-50 p-4"
                >
                  <h3 className="text-center mb-1 mt-5 font-semibold">{day.label}</h3>

                  <div className="space-y-6 text-center mt:8">
                    {dayClasses.length === 0 ? (
                      <p className="text-sm text-neutral-400">No classes</p>
                    ) : (
                      dayClasses.map((classItem) => (
                        <article
                          key={classItem.id}
                          className="group border rounded-2xl border-olive-200 bg-white p-3 grid-col-3"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className="flex">{classItem.subject}</p>

                            <button
                              onClick={() => handleDeleteClass(classItem.id)}
                              className="text-xs text-neutral-400 opacity-0 transition hover:text-red-600 group-hover:opacity-100"
                              title="Delete class"
                            >
                              ✕
                            </button>
                          </div>

                          <p className="mt-1 text-sm text-neutral-500">
                            {formatTime(classItem.start_time)} –{' '}
                            {formatTime(classItem.end_time)}
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

      {showAddForm && (
        <AddClassForm
          onSubmit={handleAddClass}
          onCancel={() => setShowAddForm(false)}
        />
      )}
    </>
  );
}

export default ScheduleSection;
