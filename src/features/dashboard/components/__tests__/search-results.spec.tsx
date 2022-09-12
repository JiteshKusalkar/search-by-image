import { render, waitFor } from '@testing-library/react';
import * as React from 'react';
import { QueryCache } from 'react-query';
import { AutoSizerProps } from 'react-virtualized-auto-sizer';
import { FixedSizeListProps } from 'react-window';

import { AppProviders } from '../../../../components/app-providers';
import { server } from '../../../../mocks/server';
import { Prediction } from '../../utils/image-predictor';
import { SearchResults } from '../search-results';

jest.mock('react-virtualized-auto-sizer', () => ({
  __esModule: true,
  ...jest.requireActual('react-virtualized-auto-sizer'),
  default: ({ children, ...restProps }: AutoSizerProps) => {
    return (
      <div>
        {JSON.stringify(restProps)}
        {children({ height: 100, width: 100 })}
      </div>
    );
  },
}));

jest.mock('react-window', () => ({
  __esModule: true,
  ...jest.requireActual('react-virtualized-auto-sizer'),
  FixedSizeList: ({
    children: Component,
    ...restProps
  }: FixedSizeListProps) => {
    return (
      <div>
        {JSON.stringify(restProps)}
        <Component index={0} style={{}} data={{}} />
      </div>
    );
  },
}));

const queryCache = new QueryCache();
beforeAll(() => server.listen());
afterEach(() => {
  queryCache.clear();
  server.resetHandlers();
});
afterAll(() => server.close());

describe('search results', () => {
  const predictions: Prediction[] = [
    {
      className: 'hound',
      probability: 0.98,
    },
  ];

  const renderComponent = () =>
    render(
      <AppProviders>
        <SearchResults predictions={predictions} />
      </AppProviders>,
    );

  it('should show results for given predictions', async () => {
    expect.hasAssertions();

    const { queryByText } = renderComponent();
    const fetchingSection = queryByText('Fetching...');

    expect(fetchingSection).not.toBeNull();

    await waitFor(
      () => expect(queryByText('Matching results')).not.toBeNull(),
      {
        mutationObserverOptions: {
          // To observe mutation in the target's children
          childList: true,
        },
      },
    );
  });
});
