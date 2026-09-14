import { useState } from 'react';

function AddClassForm({ onSubmit, onCancel }) {
  const [subject, setSubject] = useState('');
  const [weekday, setWeekday] = useState('1');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [room, setRoom] = useState('');
  const [classType, setClassType] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setError('');

    try {
      await onSubmit({
        subject,
        weekday: Number(weekday),
        startTime,
        endTime,
        room,
        classType,
      });
    } catch (error) {
      console.error(error);
      setError('Failed to add class.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-center">Add class</h2>
          <p className="mt-1 text-sm text-neutral-500 text-center">
            Add a class to your weekly schedule.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-center">Subject</label>

            <input
              type="text"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              required
              className="w-full rounded-full border border-neutral-300 px-3 py-2 outline-none focus:border-neutral-900"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-center">Day</label>

            <select
              value={weekday}
              onChange={(event) => setWeekday(event.target.value)}
              className="w-full rounded-full border border-neutral-300 px-3 py-2 outline-none focus:border-neutral-900"
            >
              <option value="1">Monday</option>
              <option value="2">Tuesday</option>
              <option value="3">Wednesday</option>
              <option value="4">Thursday</option>
              <option value="5">Friday</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium">
                Start time
              </label>

              <input
                type="time"
                value={startTime}
                onChange={(event) => setStartTime(event.target.value)}
                required
                className="w-full rounded-full border border-neutral-300 px-3 py-2 outline-none focus:border-neutral-900"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">End time</label>

              <input
                type="time"
                value={endTime}
                onChange={(event) => setEndTime(event.target.value)}
                required
                className="w-full rounded-full border border-neutral-300 px-3 py-2 outline-none focus:border-neutral-900"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-center">Room</label>

            <input
              type="text"
              value={room}
              onChange={(event) => setRoom(event.target.value)}
              placeholder="B103"
              className="w-full rounded-full border border-neutral-300 px-3 py-2 outline-none focus:border-neutral-900"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-center">Type</label>

            <input
              type="text"
              value={classType}
              onChange={(event) => setClassType(event.target.value)}
              placeholder="TP"
              className="w-full rounded-full border border-neutral-300 px-3 py-2 outline-none focus:border-neutral-900"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-green-900 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save class'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddClassForm;
