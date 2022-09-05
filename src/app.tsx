import * as React from 'react';

import { AppProviders } from './components/app-providers';
import { Dashboard } from './features/dashboard';

export const App: React.FC = () => {
  return (
    <AppProviders>
      <Dashboard />
    </AppProviders>
  );
};
