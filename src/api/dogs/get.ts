import { ErrorResponse } from '../types';

const baseURL = 'https://dog.ceo/api';

export interface DogResponse {
  message: string[];
  status: string;
}

export const getByBreed = async <Data extends DogResponse | ErrorResponse>(
  breed: string,
): Promise<Data> => {
  const url = `${baseURL}/breed/${breed}/images`;

  return fetch(url).then(
    async (response: Response): Promise<Data> => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return response.json();
    },
  );
};
