export type CryptoTicker = {
  id: string | number | null;
  symbol: string | null;
  name: string | null;
  nameid: string | null;
  rank: number | string | null;
  price_usd: number | string | null;
  price_btc: number | string | null;
  market_cap_usd: number;
  volume24: number | string | null;
  volume24a: number | string | null;
  csupply: any;
  tsupply: any;
  msupply: any;
};
