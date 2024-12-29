//FUNCTIONS FOR GET, POST, PUT, DELETE WITH FETCH

import { getTokenInLocalStorage } from "./TokenHelpers";

/**Fetches data from the API with the given endpoint with the GEET method, and requires Cryptometer API Auth.
 *
 * @param endpoint -- DO NOT add the first "/"
 * @param token
 */
export const fetchGETAuth = async (endpoint: string) => {
  try {
    const token = getTokenInLocalStorage();
    const response = await fetch(`https://localhost:7224/${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.json();
  } catch (ex) {
    console.error(ex);
  }
};
/**POST Request to the API with the given endpoint with the POST method, and requires Cryptometer API Auth. NO DATA IS SENT IN THE BODY.
 *
 * @param endpoint -DO NOT INCLUDE THE FIRST /
 * @returns
 */
export const fetchPOSTAuthWithQueryData = async (endpoint: string) => {
  try {
    const token = getTokenInLocalStorage();
    if (!token) {
      throw new Error("No token found");
    }
    const response = await fetch(`https://localhost:7224/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (ex: any) {
    throw new Error(ex.message);
  }
};

/**Function to send a DELETE request to the API with the given endpoint with DELETE method, and requires Auth
 *
 * @param endpoint
 * @returns
 */
export const fetchDELETEAuthWithQueryData = async (endpoint: string) => {
  try {
    const token = getTokenInLocalStorage();
    if (!token) {
      throw new Error("No token found");
    }
    const response = await fetch(`https://localhost:7224/${endpoint}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (ex: any) {
    throw new Error(ex.message);
  }
};

/**Fetches data from the CoinLore server for 100 cryptocurrencies with a GET request.
 *
 * @returns {Object} fetchedData
 */
export const fetchGETCryptos = async () => {
  const response = await fetch(`https://api.coinlore.net/api/tickers/`);
  const data = await response.json();
  return data;
};

/**Fetches data from any endpoint from any server with a GET request.
 *
 * @param {string} fullUrl - Must be a full URL.
 * @returns
 */
export const fetchGETAny = async (fullUrl: string) => {
  const response = await fetch(`${fullUrl}`);
  const data = await response.json();
  return data;
};

/**Fetches data from the CoinLore server for specific cryptocurrencies with a GET request.
 *
 * @param endpoint - DO NOT add the first /, it's already implied in the function.
 * @returns
 */
export const fetchGETSpecificCrypto = async (endpoint: string) => {
  const response = await fetch(
    `https://api.coinlore.net/api/ticker/${endpoint}`
  );
  const data = await response.json();
  return data;
};

/**Fetches data from the CoinLore server any endpoint with a GET request.
 *
 * @param endpoint - DO NOT add the first /, it's already implied in the function.
 * @returns
 */
export const fetchGETCoinLore = async (endpoint: string) => {
  const response = await fetch(`https://api.coinlore.net/api/${endpoint}`);
  const data = await response.json();
  return data;
};

/**Sends data to the CryptoMeter API with a POST request with no Auth needed.
 *
 * @param endpoint - DO NOT add the first /, it's already implied in the function.
 * @param data - Any data to be sent with the POST request.
 * @returns
 */
export const fetchPOST = async (endpoint: string, data: Object) => {
  const response = await fetch(`https://localhost:7224/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};
