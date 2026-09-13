import { supabase } from '../services/supabase';

function Dashboard({ user }) {
  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Logout failed:', error.message);
    }
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1>Personal Dashboard</h1>
          <p>{user.email}</p>
        </div>

        <button onClick={handleLogout}>Logout</button>
      </header>

      <main>
        <section className="dashboard-section">
          <div className="section-header">
            <div>
              <span>Schedule</span>
              <h2>Today's classes</h2>
            </div>

            <button>Add class</button>
          </div>

          <div className="empty-state">
            <p>No classes today.</p>
          </div>
        </section>

        <section className="dashboard-section">
          <div className="section-header">
            <div>
              <span>Finances</span>
              <h2>This month</h2>
            </div>
          </div>

          <div className="finance-summary">
            <article>
              <span>Income</span>
              <strong>0.00 €</strong>
            </article>

            <article>
              <span>Expenses</span>
              <strong>0.00 €</strong>
            </article>

            <article>
              <span>Saved</span>
              <strong>0.00 €</strong>
            </article>

            <article>
              <span>Available</span>
              <strong>0.00 €</strong>
            </article>
          </div>
        </section>

        <section className="dashboard-section">
          <div className="section-header">
            <div>
              <span>Transactions</span>
              <h2>Recent transactions</h2>
            </div>

            <button>Add transaction</button>
          </div>

          <div className="empty-state">
            <p>No transactions yet.</p>
          </div>
        </section>

        <section className="dashboard-section">
          <div className="section-header">
            <div>
              <span>Savings</span>
              <h2>Savings goals</h2>
            </div>

            <button>Add goal</button>
          </div>

          <div className="empty-state">
            <p>No savings goals yet.</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
