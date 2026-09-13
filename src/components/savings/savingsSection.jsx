import { useEffect, useState } from 'react';

import LinearProgress from '@mui/material/LinearProgress';

import AddGoalsForm from './addGoalsForm';
import AddSavingsMovementForm from './addSMovementsForm';

import {
  createSavings,
  deleteSavings,
  getSavings,
} from '../../services/savingGoals';

import { createSavingsMovement } from '../../services/savingMovements';

function SavingsSection({ user }) {
  const [savings, setSavings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);

  useEffect(() => {
    async function loadSavings() {
      try {
        const data = await getSavings();

        setSavings(data);
      } catch (error) {
        console.error(error);
        setError('Failed to load savings goals.');
      } finally {
        setLoading(false);
      }
    }

    loadSavings();
  }, []);

  async function handleAddSavings(savingsData) {
    try {
      const newSavings = await createSavings(user.id, savingsData);

      setSavings((currentSavings) => [
        ...currentSavings,
        {
          ...newSavings,
          savings_movements: [],
        },
      ]);

      setShowAddForm(false);
    } catch (error) {
      console.error(error);
      setError('Failed to add savings goal.');
    }
  }

  async function handleDeleteSavings(savingsId) {
    try {
      await deleteSavings(savingsId);

      setSavings((currentSavings) =>
        currentSavings.filter((saving) => saving.id !== savingsId),
      );
    } catch (error) {
      console.error(error);
      setError('Failed to delete savings goal.');
    }
  }

  async function handleAddMovement(movementData) {
    try {
      if (!selectedGoal) {
        return;
      }

      const newMovement = await createSavingsMovement(
        user.id,
        selectedGoal.id,
        movementData,
      );

      setSavings((currentSavings) =>
        currentSavings.map((saving) => {
          if (saving.id !== selectedGoal.id) {
            return saving;
          }

          return {
            ...saving,
            savings_movements: [
              ...(saving.savings_movements || []),
              newMovement,
            ],
          };
        }),
      );

      setSelectedGoal(null);
    } catch (error) {
      console.error(error);
      setError('Failed to add savings movement.');
    }
  }

  return (
    <>
      <section className="rounded-2xl border border-neutral-200 bg-white p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Savings
            </p>

            <h2 className="mt-1 text-2xl font-semibold">Savings goals</h2>
          </div>

          <button
            onClick={() => setShowAddForm(true)}
            className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
          >
            Add savings goal
          </button>
        </div>

        {loading && (
          <p className="text-sm text-neutral-500">Loading savings goals...</p>
        )}

        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

        {!loading && savings.length === 0 && (
          <div className="rounded-xl border border-dashed border-neutral-300 p-8 text-center">
            <p className="text-sm text-neutral-500">No savings goals yet.</p>
          </div>
        )}

        {!loading && savings.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {savings.map((saving) => {
              const currentAmount = (saving.savings_movements || []).reduce(
                (total, movement) => total + Number(movement.amount),
                0,
              );

              const targetAmount = Number(saving.target_amount) || 0;

              const progress =
                targetAmount > 0
                  ? Math.max(
                      0,
                      Math.min((currentAmount / targetAmount) * 100, 100),
                    )
                  : 0;

              return (
                <article
                  key={saving.id}
                  className="group rounded-xl border border-neutral-200 bg-neutral-50 p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-neutral-900">
                        {saving.name}
                      </h3>

                      {saving.description && (
                        <p className="mt-1 text-sm text-neutral-500">
                          {saving.description}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => handleDeleteSavings(saving.id)}
                      className="text-sm text-neutral-400 opacity-0 transition hover:text-red-600 group-hover:opacity-100"
                      title="Delete savings goal"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="mt-6 flex items-end justify-between">
                    <div>
                      <p className="text-2xl font-semibold text-neutral-900">
                        {currentAmount.toLocaleString('pt-PT', {
                          style: 'currency',
                          currency: 'EUR',
                        })}
                      </p>

                      <p className="mt-1 text-sm text-neutral-500">
                        of{' '}
                        {targetAmount.toLocaleString('pt-PT', {
                          style: 'currency',
                          currency: 'EUR',
                        })}
                      </p>
                    </div>

                    <span className="text-sm font-medium text-neutral-500">
                      {Math.round(progress)}%
                    </span>
                  </div>

                  <div className="mt-4">
                    <LinearProgress
                      variant="determinate"
                      value={progress}
                      sx={{
                        height: 10,
                        borderRadius: 999,
                        backgroundColor: '#dcfce7',

                        '& .MuiLinearProgress-bar': {
                          borderRadius: 999,
                          backgroundColor: '#16a34a',
                        },
                      }}
                    />
                  </div>

                  {saving.deadline && (
                    <div className="mt-4 border-t border-neutral-200 pt-4">
                      <p className="text-xs text-neutral-500">Deadline</p>

                      <p className="mt-1 text-sm font-medium">
                        {new Date(
                          `${saving.deadline}T00:00:00`,
                        ).toLocaleDateString('pt-PT')}
                      </p>
                    </div>
                  )}

                  <button
                    onClick={() => setSelectedGoal(saving)}
                    className="mt-5 w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium transition hover:bg-neutral-100"
                  >
                    Add movement
                  </button>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {showAddForm && (
        <AddGoalsForm
          onSubmit={handleAddSavings}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {selectedGoal && (
        <AddSavingsMovementForm
          goal={selectedGoal}
          onSubmit={handleAddMovement}
          onCancel={() => setSelectedGoal(null)}
        />
      )}
    </>
  );
}

export default SavingsSection;
