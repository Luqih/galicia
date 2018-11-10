import { API_KEY, GALICIA_URL } from './constants';

const getConfig = ({ method, headers, body }) => ({
  method,
  headers: new Headers({
    'Content-Type': 'application/json',
    ...headers,
  }),
});

const handleFetchResponse = async (response) => {
  if (!(response.status >= 200 && response.status < 300)) {
    throw new Error(`Status: ${response.status}`);
  }

  const contentType = response.headers.get('content-type');

  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }

  throw new TypeError("Response isn't JSON");
};

export const getCustomers = () =>
  fetch(`${GALICIA_URL}/customers?apikey=${API_KEY}`, getConfig({ method: 'GET', headers: {} }))
    .then(handleFetchResponse)
    .catch(e => e);

export const createMerchant = ({ body }) =>
  fetch(`${GALICIA_URL}/merchants?apikey=${API_KEY}`, getConfig(({ method: 'POST', headers: {}, body })))
    .then(handleFetchResponse)
    .catch(e => e);

