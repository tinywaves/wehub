import AuthenticatedApp from 'pages/authenticated-app';
import UnauthenticatedApp from 'pages/unauthenticated-app';

import { useAuth } from 'hooks';

import './App.css';

function App() {
  const { user } = useAuth();
  return (
    <div className="app">
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;
