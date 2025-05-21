const TTL = 7 * 24 * 60 * 60 * 1000;

interface CachedRate {
  rate: number;
  timestamp: number;
}

const getKey = (from: string, to: string) => `exchangeRate_${from}_${to}`;

export const getCachedExchangeRate = (from: string, to: string): number | null => {
  try {
    const key = getKey(from, to);
    const raw = localStorage.getItem(key);
    if (!raw) return null;

    const parsed: CachedRate = JSON.parse(raw);
    const now = Date.now();

    if (now - parsed.timestamp < TTL) {
      return parsed.rate;
    } else {
      localStorage.removeItem(key);
      return null;
    }
  } catch {
    return null;
  }
};

export const setCachedExchangeRate = (from: string, to: string, rate: number) => {
  try {
    const key = getKey(from, to);
    const value: CachedRate = { rate, timestamp: Date.now() };
    localStorage.setItem(key, JSON.stringify(value));
  } catch(error) {
    console.error('Failed to cache exchange rate:', error);
  }
};