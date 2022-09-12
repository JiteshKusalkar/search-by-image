import axios from 'axios';

import { BASE_URL } from '../base-url';
import { ErrorResponse } from '../types';

export interface DogResponse {
  message: string[];
  status: string;
}

export const getByBreed = async <Data extends DogResponse | ErrorResponse>(
  breed: string,
): Promise<Data> => {
  const url = `${BASE_URL}/breed/${breed}/images`;
  const response = await axios.get(url);

  return response.data;
};
