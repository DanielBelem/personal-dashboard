import { useState } from 'react';

function AddSavingsMovementForm({ goal, onSubmit, onCancel }) {
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('deposit');

  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const [description, setDescription] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    setError('');

    const numericAmount = Number(amount);

    if (numericAmount <= 0) {
      setError('Amount must be greater than zero.');
      return;
    }

    setLoading(true);

    try {
      const finalAmount =
        type === 'withdrawal' ? -numericAmount : numericAmount;

      await onSubmit({
        amount: finalAmount,
        date,
        description,
      });
    } catch (error) {
      console.error(error);
      setError('Failed to add movement.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Add movement</h2>

          <p className="mt-1 text-sm text-neutral-500">{goal.name}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Type</label>

            <select
              value={type}
              onChange={(event) => setType(event.target.value)}
              className="w-full rounded-lg border border-neutral-300 px-3 py-2"
            >
              <option value="deposit">Add money</option>

              <option value="withdrawal">Withdraw money</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Amount</label>

            <input
              type="number"
              min="0.01"
              step="0.01"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              required
              className="w-full rounded-lg border border-neutral-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Date</label>

            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              required
              className="w-full rounded-lg border border-neutral-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Description
            </label>

            <input
              type="text"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Weekly saving"
              className="w-full rounded-lg border border-neutral-300 px-3 py-2"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="rounded-lg border border-neutral-300 px-4 py-2"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-neutral-900 px-4 py-2 text-white"
            >
              {loading ? 'Saving...' : 'Add movement'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddSavingsMovementForm;
