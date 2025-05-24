export const fetchExchangeRate = async (from: string, to: string): Promise<number> => {
  const res = await fetch(`https://open.er-api.com/v6/latest/${from}`);
  const data = await res.json();

  if (data.result !== 'success' || typeof data.rates?.[to] !== 'number') {
    throw new Error(`Invalid exchange rate data: ${JSON.stringify(data)}`);
  }

  return data.rates[to];
};