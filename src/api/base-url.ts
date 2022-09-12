const MOCK_BASE_URL = 'https://dog.ceo/api';
export const BASE_URL =
  process.env.NODE_ENV === 'test'
    ? MOCK_BASE_URL
    : process.env.BASE_URL ?? MOCK_BASE_URL;
