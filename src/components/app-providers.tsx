import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import ErrorBoundary from './error-boundary';

const queryClient = new QueryClient();

export const AppProviders: React.FC = ({
  children,
}: React.PropsWithChildren<{}>) => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ErrorBoundary>
  );
};
