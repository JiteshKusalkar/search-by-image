import {
  AsyncResponseResolverReturnType,
  MockedRequest,
  MockedResponse,
  ResponseComposition,
  rest,
  RestContext,
} from 'msw';

import { BASE_URL } from '../../api/base-url';

const url = `${BASE_URL}/breed/hound/images`;
export const dogResponseByBreed = {
  message: [
    'https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg',
    'https://images.dog.ceo/breeds/hound-afghan/n02088094_1007.jpg',
  ],
  status: 'success',
};

type BodyType = typeof dogResponseByBreed;

export const getByBreedHandler = rest.get(
  url,
  (
    _req: MockedRequest,
    res: ResponseComposition<BodyType>,
    ctx: RestContext,
  ): AsyncResponseResolverReturnType<MockedResponse<BodyType>> =>
    res(ctx.json(dogResponseByBreed)),
);
