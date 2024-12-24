//FUNCTIONS FOR GET, POST, PUT, DELETE WITH FETCH

export const fetchGETAuth = async (endpoint:string, token:string) => {

}

export const fetchPOSTAuth = async (endpoint:string,token:string, data:Object[] | Object) => {

}

/**Fetches data from the CoinLore server for 100 cryptocurrencies with a GET request.
 * 
 * @returns {Object} fetchedData
 */
export const fetchGETCryptos = async () => {
    const response = await fetch(`https://api.coinlore.net/api/tickers/`);
    const data = await response.json();
    return data;
}


/**Fetches data from any endpoint from any server with a GET request.
 * 
 * @param {string} fullUrl - Must be a full URL.
 * @returns 
 */
export const fetchGETAny = async (fullUrl:string) => {
    const response = await fetch(`${fullUrl}`);
    const data = await response.json();
    return data;
}

/**Fetches data from the CoinLore server for specific cryptocurrencies with a GET request.
 * 
 * @param endpoint - DO NOT add the first /, it's already implied in the function.
 * @returns 
 */
export const fetchGETSpecificCrypto = async (endpoint:string) => {
    const response = await fetch(`https://api.coinlore.net/api/ticker/${endpoint}`);
    const data = await response.json();
    return data;
}

/**Sends data to the CryptoMeter API with a POST request with no Auth needed.
 * 
 * @param endpoint - DO NOT add the first /, it's already implied in the function.
 * @param data - Any data to be sent with the POST request.
 * @returns 
 */
export const fetchPOST = async (endpoint:string, data: Object) => {
    const response = await fetch(`https://localhost:7224/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    return response.json()
}