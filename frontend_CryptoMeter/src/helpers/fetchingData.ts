//FUNCTIONS FOR GET, POST, PUT, DELETE WITH FETCH

export const fetchGETAuth = async (endpoint:string, token:string) => {

}

export const fetchPOSTAuth = async (endpoint:string,token:string, data:Object[] | Object) => {

}

export const fetchGETCryptos = async () => {
    const response = await fetch(`https://api.coinlore.net/api/tickers/`);
    const data = await response.json();
    return data;
}

export const fetchGETAny = async (fullUrl:string) => {
    const response = await fetch(`${fullUrl}`);
    const data = await response.json();
    return data;
}

export const fetchGETSpecificCrypto = async (endpoint:string | "") => {
    const response = await fetch(`https://api.coinlore.net/api/ticker/${endpoint}`);
    const data = await response.json();
    return data;
}

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