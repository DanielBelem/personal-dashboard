import { useEffect, useState } from 'react';

import LoginPage from './pages/loginPage';
import DashboardPage from './pages/dashboardPage';
import { supabase } from './services/supabase';

import './index.css';

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getInitialSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);
      setLoading(false);
    }

    getInitialSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="loading-page">
        <p>Loading...</p>
      </div>
    );
  }

  return session ? <DashboardPage user={session.user} /> : <LoginPage />;
}

export default App;
