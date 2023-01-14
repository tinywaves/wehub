import AuthenticatedApp from 'pages/authenticated-app';
import UnauthenticatedApp from 'pages/unauthenticated-app';
import { ErrorBoundaries, FullPageErrorFeedback } from 'components';

import { useAuth } from 'hooks';

import './App.css';

function App() {
  const { user } = useAuth();
  return (
    <div className="app">
      <ErrorBoundaries fallbackRender={FullPageErrorFeedback}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundaries>
    </div>
  );
}

export default App;
