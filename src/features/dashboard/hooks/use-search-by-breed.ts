import { UseQueryOptions, UseQueryResult } from 'react-query';

import { DogResponse, getByBreed } from '../../../api/dogs/get';
import { ErrorResponse } from '../../../api/types';
import { useGetAsyncResponse } from '../../../hooks/use-get-async-response';

export const useSearchByBreed = (
  breed?: string,
  options?: UseQueryOptions<DogResponse, ErrorResponse>,
): UseQueryResult<DogResponse> => {
  const queryFn = async (): Promise<DogResponse> =>
    getByBreed(breed?.toLowerCase() ?? '');

  return useGetAsyncResponse(['dog', 'list', breed], queryFn, {
    enabled: Boolean(breed),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    ...options,
  });
};

export default useSearchByBreed;
