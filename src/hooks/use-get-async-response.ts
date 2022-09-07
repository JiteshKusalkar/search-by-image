import {
  QueryFunction,
  QueryKey,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from 'react-query';

import { ErrorResponse } from '../api/types';

export const useGetAsyncResponse = <Response>(
  queryKey: QueryKey,
  queryFn: QueryFunction<Response>,
  options?: UseQueryOptions<Response, ErrorResponse>,
): UseQueryResult<Response> => {
  return useQuery(queryKey, queryFn, options);
};
