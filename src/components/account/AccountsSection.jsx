import { useEffect, useState } from 'react';

import {
  createAccount,
  deleteAccount,
  getAccounts,
} from '../../services/accounts';

function AccountsSection({ user }) {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadAccounts() {
      try {
        const data = await getAccounts();

        setAccounts(data);
      } catch (error) {
        console.error(error);
        setError('Failed to load personal accounts.');
      } finally {
        setLoading(false);
      }
    }

    loadAccounts();
  }, []);

  async function handleAddAccount(accountData) {
    try {
      const newAccount = await createAccount(
        user.id,
        accountData,
      );

      setAccounts((currentAccounts) => [
        ...currentAccounts,
        newAccount,
      ]);
    } catch (error) {
      console.error(error);
      setError('Failed to add personal account.');
    }
  }

  async function handleDeleteAccount(accountId) {
    try {
      await deleteAccount(accountId);

      setAccounts((currentAccounts) =>
        currentAccounts.filter(
          (account) => account.id !== accountId,
        ),
      );
    } catch (error) {
      console.error(error);
      setError('Failed to delete personal account.');
    }
  }

  return (
    <>
      <section className="rounded-2xl border border-neutral-200 bg-slate-200 p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Accounts
            </p>

            <h2 className="mt-1 text-2xl font-semibold">
              Personal accounts
            </h2>
          </div>
        </div>

        {loading && (
          <p className="text-sm text-neutral-500">
            Loading accounts...
          </p>
        )}

        {error && (
          <p className="mb-4 text-sm text-red-600">
            {error}
          </p>
        )}

        {!loading && accounts.length === 0 && (
          <div className="rounded-xl border border-dashed border-neutral-300 p-8 text-center">
            <p className="text-sm text-neutral-500">
              No personal accounts yet.
            </p>
          </div>
        )}

        {!loading && accounts.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {accounts.map((account) => (
              <article
                key={account.id}
                className="group rounded-xl border border-neutral-200 bg-neutral-50 p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-neutral-900">
                      {account.name}
                    </h3>

                    <p className="mt-1 text-sm text-neutral-500">
                      {account.type}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      handleDeleteAccount(account.id)
                    }
                    className="text-sm text-neutral-400 opacity-0 transition hover:text-red-600 group-hover:opacity-100"
                    title="Delete account"
                  >
                    ✕
                  </button>
                </div>

                <div className="mt-6">
                  <p className="text-xs text-neutral-500">
                    Initial balance
                  </p>

                  <p className="mt-1 text-2xl font-semibold text-neutral-900">
                    {Number(
                      account.initial_bal,
                    ).toLocaleString('pt-PT', {
                      style: 'currency',
                      currency: 'EUR',
                    })}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default AccountsSection;