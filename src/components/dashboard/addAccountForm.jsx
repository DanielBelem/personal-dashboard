import { useState } from 'react';

function AddAccountForm({ onSubmit, onCancel }) {
  const [name, setName] = useState('');
  const [initial_bal, setInitialBal] = useState('');
  const [type, setType] = useState('savings');
  const [goal_amount, setGoalAmount] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(account) {
    account.preventDefault();

    setLoading(true);
    setError('');

    try {
      await onSubmit({
        name: name,
        initial_bal: initial_bal,
        type: type,
        goal_amount: goal_amount ? null : goal_amount,
      });
    } catch (error) {
      console.error(error);
      setError('Failed to add account.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-6 text-center">
          <h1 className="text-xl font-semibold">
            Add Account
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label className="mb-1 block text-center text-sm font-medium">
              Bank
            </label>

            <input
              type="text"
              value={name}
              onChange={(account) =>
                setName(account.target.value)
              }
              placeholder="Revolut, Moey..."
              required
              className="w-full rounded-full border border-neutral-300 px-3 py-2 outline-none focus:border-neutral-900"
            />
          </div>
          <div>
              <label className="mb-1 block text-center text-sm font-medium">
                Initial Balance
              </label>

              <input
                type="text"
                placeholder = "500"
                value={initial_bal}
                onChange={(account) =>
                  setInitialBal(account.target.value)
                }
                required
                className="w-full rounded-full border border-neutral-300 px-3 py-2 outline-none focus:border-neutral-900"
              />
            </div>

          <div>
            <label className="mb-1 block text-center text-sm font-medium">
              Account type
            </label>

            <select
              value={type}
              onChange={(event) => {
                setType(event.target.value);

                if (event.target.value !== 'savings') {
                  setGoalAmount('');
                }
              }}
              className="w-full rounded-full border border-neutral-300 px-3 py-2 outline-none focus:border-neutral-900"
            >
              <option value="savings">
                Savings
              </option>

              <option value="current">
                Current
              </option>
            </select>
          </div>

          {type === 'savings' && (
            <div>
              <label className="mb-1 block text-center text-sm font-medium">
                Saving Goal
              </label>

              <input
                type="number"
                step="50"
                min="0"
                value={goal_amount}
                onChange={(event) =>
                  setGoalAmount(event.target.value)
                }
                placeholder="500"
                className="w-full rounded-full border border-neutral-300 px-3 py-2 outline-none focus:border-neutral-900"
              />
            </div>
          )}

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
                : 'Save account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddAccountForm;