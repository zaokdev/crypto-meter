import { jwtDecode } from "jwt-decode";
import { getCurrentTime } from "./generalHelpers";
import { NavigateFunction } from "react-router-dom";

/**Sets the token in the local storage.
 *
 * @param token
 */
export const setTokenInLocalStorage = (token: string) => {
  localStorage.setItem("CryptoMeter_JWT_Token", token);
};

/**Deletes the token from the local storage.
 *
 */
export const deleteTokenInLocalStorage = () => {
  localStorage.removeItem("CryptoMeter_JWT_Token");
};

/**Gets the token from local storage and returns it. If the token is not found, returns null.
 *
 * @returns
 */
export const getTokenInLocalStorage = () => {
  return localStorage.getItem("CryptoMeter_JWT_Token");
};

/**Function that checks if the token is valid.
 *
 * @returns True if the token is valid, false otherwise.
 */
export const isTokenStillValid = () => {
  const { exp } = getUserData();
  return exp > getCurrentTime();
};

export const invalidTokenDetected = (navigate: NavigateFunction) => {
  deleteTokenInLocalStorage();
  navigate("/login");
};

/**Gets user data if exists
 *
 * @returns
 */
export const getUserData: () => any = () => {
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
