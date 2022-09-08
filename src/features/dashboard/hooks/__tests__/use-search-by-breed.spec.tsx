import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';
import { QueryCache } from 'react-query';

import { AppProviders } from '../../../../components/app-providers';
import { dogResponseByBreed } from '../../../../mocks/api/dogs';
import { server } from '../../../../mocks/server';
import useSearchByBreed from '../use-search-by-breed';

const queryCache = new QueryCache();
beforeAll(() => server.listen());
afterEach(() => {
  queryCache.clear();
  server.resetHandlers();
});
afterAll(() => server.close());

const wrapper: React.FC = ({ children }: React.PropsWithChildren<{}>) => (
  <AppProviders>{children}</AppProviders>
);

describe('useSearchByBreed', () => {
  it('should fetch the required data', async () => {
    expect.assertions(1);
    const { result, waitFor } = renderHook(() => useSearchByBreed('hound'), {
      wrapper,
    });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toStrictEqual(dogResponseByBreed);
  });
});
