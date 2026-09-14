import { useState } from 'react';

function AddGoalsForm({ onSubmit, onCancel }) {
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [deadline, setDeadline] = useState('');
  const [description, setDescription] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    setError('');

    const numericTarget = Number(targetAmount);

    if (numericTarget <= 0) {
      setError('Target amount must be greater than zero.');
      return;
    }

    setLoading(true);

    try {
      await onSubmit({
        name,
        targetAmount: numericTarget,
        deadline,
        description,
      });
    } catch (error) {
      console.error(error);
      setError('Failed to add savings goal.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Add savings goal</h2>

          <p className="mt-1 text-sm text-neutral-500">
            Create a new savings target.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Name</label>

            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Emergency fund"
              required
              className="w-full rounded-lg border border-neutral-300 px-3 py-2 outline-none focus:border-neutral-900"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Target amount
            </label>

            <div className="relative">
              <input
                type="number"
                min="0.01"
                step="0.01"
                value={targetAmount}
                onChange={(event) => setTargetAmount(event.target.value)}
                placeholder="500"
                required
                className="w-full rounded-lg border border-neutral-300 px-3 py-2 pr-10 outline-none focus:border-neutral-900"
              />

              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-neutral-400">
                €
              </span>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Deadline</label>

            <input
              type="date"
              value={deadline}
              onChange={(event) => setDeadline(event.target.value)}
              className="w-full rounded-lg border border-neutral-300 px-3 py-2 outline-none focus:border-neutral-900"
            />

            <p className="mt-1 text-xs text-neutral-400">Optional</p>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Description
            </label>

            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Why are you saving for this?"
              rows="3"
              className="w-full resize-none rounded-lg border border-neutral-300 px-3 py-2 outline-none focus:border-neutral-900"
            />

            <p className="mt-1 text-xs text-neutral-400">Optional</p>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium transition hover:bg-neutral-100 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-green-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Create goal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddGoalsForm;
