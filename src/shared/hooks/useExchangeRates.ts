import { useEffect, useState } from 'react';
import { apiCall } from '../api';
import { getCachedExchangeRate, setCachedExchangeRate } from '../lib/exchangeRateCache';

const BASE = 'USD';

export const useExchangeRates = (currencies: string[]) => {
  const [rates, setRates] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchRates = async () => {
      const result: Record<string, number> = {};

      for (const currency of currencies) {
        if (currency === BASE) {
          result[currency] = 1;
          continue;
        }

        const cached = getCachedExchangeRate(currency, BASE);
        if (cached) {
          result[currency] = cached;
        } else {
          try {
            const rate = await apiCall.fetchExchangeRate(currency, BASE);
            setCachedExchangeRate(currency, BASE, rate);
            result[currency] = rate;
          } catch {
            result[currency] = 1;
          }
        }
      }

      setRates(result);
    };

    fetchRates();
  }, [currencies.join(',')]);

  return rates;
};