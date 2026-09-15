import { useState } from 'react';

import { supabase } from '../services/supabase';
import ScheduleSection from '../components/schedule/ScheduleSection';
import DashboardSection from '../components/dashboard/DashboardSection';

function DashboardPage({ user }) {
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);

    const { error } = await supabase.auth.signOut({
      scope: 'local',
    });

    if (error) {
      console.error('Error signing out:', error.message);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-mist-300">
      <header className="border-b border-olive-200 bg-mist-400/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-xl font-semibold text-neutral-900">
              Personal Dashboard
            </h1>

            <p className="text-sm text-neutral-500">
              Logged in as {user.email}
            </p>
          </div>

          <button
            onClick={handleLogout}
            disabled={loading}
            className="rounded-full border border-olive-200 px-4 py-2 text-sm font-medium transition hover:bg-red-200 disabled:opacity-50"
          >
            {loading ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-8xl space-y-8 px-6 py-8">
        <DashboardSection user={user} />
        <ScheduleSection user={user} />
      </main>
    </div>
  );
}

export default DashboardPage;
