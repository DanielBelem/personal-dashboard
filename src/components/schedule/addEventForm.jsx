import { useState } from 'react';

function AddEventForm({ onSubmit, onCancel }) {
  const [name, setName] = useState('');
  const [description, setDescription] =
    useState('');

  const [recurring, setRecurring] =
    useState(true);

  const [weekday, setWeekday] = useState('1');
  const [date, setDate] = useState('');

  const [startTime, setStartTime] =
    useState('');
  const [endTime, setEndTime] = useState('');

  const [loading, setLoading] =
    useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setError('');

    try {
      await onSubmit({
        name: name.trim(),
        description:
          description.trim() || null,

        recurring,

        weekday: recurring
          ? Number(weekday)
          : null,

        date: recurring ? null : date,

        startTime,
        endTime: endTime || null,
      });
    } catch (error) {
      console.error(error);
      setError('Failed to add event.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-6 text-center">
          <h2 className="text-xl font-semibold">
            Add event
          </h2>

          <p className="mt-1 text-sm text-neutral-500">
            Add an activity to your schedule.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label className="mb-1 block text-center text-sm font-medium">
              Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              placeholder="Gym, Compilers, Dinner..."
              required
              className="w-full rounded-full border border-neutral-300 px-3 py-2 outline-none focus:border-neutral-900"
            />
          </div>

          <div>
            <label className="mb-1 block text-center text-sm font-medium">
              Event type
            </label>

            <select
              value={
                recurring
                  ? 'recurring'
                  : 'one-time'
              }
              onChange={(event) =>
                setRecurring(
                  event.target.value ===
                    'recurring',
                )
              }
              className="w-full rounded-full border border-neutral-300 px-3 py-2 outline-none focus:border-neutral-900"
            >
              <option value="recurring">
                Recurring
              </option>

              <option value="one-time">
                One-time event
              </option>
            </select>
          </div>

          {recurring ? (
            <div>
              <label className="mb-1 block text-center text-sm font-medium">
                Day
              </label>

              <select
                value={weekday}
                onChange={(event) =>
                  setWeekday(event.target.value)
                }
                className="w-full rounded-full border border-neutral-300 px-3 py-2 outline-none focus:border-neutral-900"
              >
                <option value="1">
                  Monday
                </option>
                <option value="2">
                  Tuesday
                </option>
                <option value="3">
                  Wednesday
                </option>
                <option value="4">
                  Thursday
                </option>
                <option value="5">
                  Friday
                </option>
                <option value="6">
                  Saturday
                </option>
                <option value="7">
                  Sunday
                </option>
              </select>
            </div>
          ) : (
            <div>
              <label className="mb-1 block text-center text-sm font-medium">
                Date
              </label>

              <input
                type="date"
                value={date}
                onChange={(event) =>
                  setDate(event.target.value)
                }
                required
                className="w-full rounded-full border border-neutral-300 px-3 py-2 outline-none focus:border-neutral-900"
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-center text-sm font-medium">
                Start time
              </label>

              <input
                type="time"
                value={startTime}
                onChange={(event) =>
                  setStartTime(
                    event.target.value,
                  )
                }
                required
                className="w-full rounded-full border border-neutral-300 px-3 py-2 outline-none focus:border-neutral-900"
              />
            </div>

            <div>
              <label className="mb-1 block text-center text-sm font-medium">
                End time
              </label>

              <input
                type="time"
                value={endTime}
                onChange={(event) =>
                  setEndTime(event.target.value)
                }
                className="w-full rounded-full border border-neutral-300 px-3 py-2 outline-none focus:border-neutral-900"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-center text-sm font-medium">
              Description
            </label>

            <textarea
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              placeholder="Optional details..."
              rows="3"
              className="w-full resize-none rounded-full text-center border border-neutral-300 px-3 py-2 outline-none focus:border-neutral-900"
            />
          </div>

          {error && (
            <p className="text-center text-sm text-red-600">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-100 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-green-900 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
            >
              {loading
                ? 'Saving...'
                : 'Save event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEventForm;