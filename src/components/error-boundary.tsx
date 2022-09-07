import * as React from 'react';

import { Button } from './button';

interface Props {
  children?: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  /*
   * Uncomment this if you want to catch the error
   * public static componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
   * // Make calls to external APIs for tracking purposes
   * }
   */

  public render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1 className="md:text-4xl lg:text-6xl">
            Sorry.. there was an error
          </h1>
          <Button onClick={() => window.location.reload()}>Refresh Page</Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
