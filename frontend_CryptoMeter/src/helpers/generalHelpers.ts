/**Function that returns de current time in Unix timestamp format
 *
 * @returns Current Time
 */
export const getCurrentTime = () => {
  return Math.floor(Date.now() / 1000);
};
