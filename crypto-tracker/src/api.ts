const BASE_URL = 'https://api.coinpaprika.com/v1';

export const getCoins = () => {
  return fetch(`${BASE_URL}/coins`)
    .then((res) => res.json())
    .then((json) => json.slice(0, 50));
};

export const getCoin = (coinId: string) => {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((res) => res.json());
};

export const getTicker = (coinId: string) => {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((res) => res.json());
};

export const getCoinHistorical = (coinId: string) => {
  const today = Math.floor(new Date().getTime() / 1000);
  const start = today - 1209600; // 2 weeks ago
  const end = today;
  return fetch(`${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${start}&end=${end}`).then(
    (res) => res.json(),
  );
};
