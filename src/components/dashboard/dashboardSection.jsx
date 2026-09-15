import { useEffect, useState } from 'react';


{/*---------------ACCOUNT IMPORTS---------------*/}
import {
  createAccount,
  deleteAccount,
  getAccounts,
} from '../../services/accounts';

{/*---------------TRANSACTIONS IMPORTS---------------*/}





function DashboardSection({ user }){
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  {/*---------------ACCOUNT FUNCTIONS---------------*/}
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
  {/*---------------TRANSACTION FUNCTIONS---------------*/}

  {/*---------------GRAPH FUNCTIONS---------------*/}

  return (
    <>
      <section className="rounded-2xl border border-olive-200 bg-slate-200 p-6 text-center">
        
        <div className="min-h-[400px] grid grid-rows-[75px_1fr_1fr_50px] grid-cols-4"> {/*mind the gap hehe*/}
            
            {/*TODO LIST*/}
            <div className="row-start-1 col-start-1 row-span-2 border border-dashed">
                TODO LIST
            </div>
            
            {/*QUICK ACTIONS*/}
            <div className="row-start-3 col-start-1  row-span-2 border border-dashed">
                Quick Actions section
            </div>
            
            {/*ACCOUNT SECTION*/}
            <div className="row-start-1 col-start-2 border border-dashed">
                <div className="font-medium text-xl self-center">Personal Accounts</div>                
            </div>
            
            {/*ACCOUNT CARDS*/}
            <div className="row-start-2 col-start-2 row-span-3 border border-dashed">
                
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
                  <div className="rounded-full border border-olive-300 p-8 text-center">
                    <p className="text-sm text-neutral-500">
                      No personal accounts yet.
                    </p>
                  </div>
                )}

                {!loading && accounts.length > 0 && (
                  <div className="">
                    {accounts.map((account) => (
                        <article
                            key={account.id}
                            className="group rounded-xl border border-neutral-200 bg-neutral-50 p-4"
                        >
                            <div className="grid grid-cols-[1fr_auto] grid-rows-2 gap-y-2">
                            <p className="col-start-1 row-start-1 font-semibold text-neutral-900">
                              {account.name}
                            </p>

                            <button
                              onClick={() => handleDeleteAccount(account.id)}
                              className="col-start-2 row-start-1 text-sm text-neutral-400 transition hover:text-red-500"
                              title="Delete account"
                            >
                              ✕
                            </button>

                            <p className="col-start-1 row-start-2 text-xs text-neutral-500">
                              Balance
                            </p>

                            <p className="col-start-2 row-start-2 text-sm font-medium text-neutral-900">
                              {Number(account.initial_bal).toLocaleString('pt-PT', {
                                style: 'currency',
                                currency: 'EUR',
                              })}
                            </p>
                          </div>
                        </article>
                    ))}
                  </div>
                )}
            </div>


            {/*GRAPH SECTION*/}
            <div className="row-start-1 col-start-3 col-span-2 row-span-4 border border-dashed">
                Graph Section
            </div>

            
        </div>
                 
      </section>   
    </>
  );
}

export default DashboardSection;