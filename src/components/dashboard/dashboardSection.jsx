import { useEffect, useState } from 'react';


{/*---------------ACCOUNT IMPORTS---------------*/}
import {
  createAccount,
  deleteAccount,
  getAccounts,
} from '../../services/accounts';

import AddAccountForm from './addAccountForm';

{/*---------------TRANSACTIONS IMPORTS---------------*/}



function DashboardSection({ user }){
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [showAddForm, setShowAddForm] = useState(false);


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
      setShowAddForm(false);
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
            <div className="row-start-1 col-start-2 border border-olive-300 bg-white rounded-2xl">
                <div className="font-medium text-xl mt-5">Personal Accounts</div>                
            </div>

            <div className="row-start-2 col-start-2 row-span-3 grid grid-rows-3 grid-cols-3 rounded-full">
                {!loading &&
                  accounts.slice(0, 3).map((account) => (
                    <article
                      key={account.id}
                      className="group col-span-3 grid grid-cols-[1fr_auto] grid-rows-2 items-center px-6 rounded-2xl border border-olive-300 bg-teal-50 hover:bg-teal-50/80"
                    >
                      <p className="col-start-1 row-start-1 justify-self-start font-semibold">
                        {account.name}
                      </p>
                
                         <button
                        onClick={() => handleDeleteAccount(account.id)}
                        className="col-start-2 row-start-1 justify-self-end text-sm text-neutral-400 transition hover:text-red-500"
                        title="Delete account"
                      >
                        ✕
                      </button>
                
                         <p className="col-start-1 row-start-2 justify-self-start text-xs text-neutral-500 ">
                        Balance
                      </p>
                
                         <p className="col-start-2 row-start-2 justify-self-end font-medium">
                        {Number(account.initial_bal).toLocaleString('pt-PT', {
                          style: 'currency',
                          currency: 'EUR',
                        })}
                      </p>
                    </article>
                ))}
        
               {!loading && accounts.length < 3 && (
                <button
                    onClick={() => setShowAddForm(true)}
                    type="button"
                    className="col-span-3 grid place-items-center rounded-2xl border border-olive-300 bg-teal-50 text-neutral-400 transition hover:bg-teal-50/80 hover:text-green-900 text-2xl"
                    >
                    +
                </button>
                )}
            </div>

            {/*GRAPH SECTION*/}
            <div className="row-start-1 col-start-3 col-span-2 row-span-4 border border-dashed">
                Graph Section
            </div>

            







        </div>
                 
      </section>   
    
        {showAddForm && (
        <AddAccountForm
          onSubmit={handleAddAccount}
          onCancel={() =>
            setShowAddForm(false)
          }
        />
      )}

    </>
  );
}

export default DashboardSection;