import { render } from '@testing-library/react';
import * as React from 'react';

import ErrorBoundary from '../error-boundary';

const Child = () => {
  throw new Error('something went wrong');
};

describe('error boundary', () => {
  it(`should render error boundary component for an error`, () => {
    expect.assertions(1);
    // Intentionally disabling error on console
    const spy = jest.spyOn(console, 'error');
    spy.mockImplementation(() => {});

    const { queryByText } = render(
      <ErrorBoundary>
        <Child />
      </ErrorBoundary>,
    );
    const errorMessage = queryByText('Sorry... there was an error');
    expect(errorMessage).not.toBeNull();
    spy.mockRestore();
  });
});
