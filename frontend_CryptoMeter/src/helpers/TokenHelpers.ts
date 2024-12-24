import { jwtDecode } from "jwt-decode";

/**Sets the token in the local storage.
 *
 * @param token
 */
export const setTokenInLocalStorage = (token: string) => {
  localStorage.setItem("CryptoMeter_JWT_Token", token);
};

/**Gets the token from local storage and returns it. If the token is not found, returns null.
 *
 * @returns
 */
export const getTokenInLocalStorage = () => {
  return localStorage.getItem("CryptoMeter_JWT_Token");
};

/**Gets user data if exists
 *
 * @returns
 */
export const getUserData = () => {
  const token = getTokenInLocalStorage();
  if (token === null) {
    return "NO USER DATA";
  }

  const decodedData = jwtDecode(token);
  return decodedData;
};

/**Function to determine if the user is logged in
 *
 * @returns
 */
export const isLoggedIn = () => {
  const token = localStorage.getItem("CryptoMeter_JWT_Token");
  return token != null ? true : false;
};
