import { useState, useEffect } from 'react';
import { fetchLocations } from '../api/locationService';

const useFetchLocations = (query: string, delay: number = 300) => {
  const [suggestions, setSuggestions] = useState<any[]>([]);

  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    const timeout = setTimeout(async () => {
      const results = await fetchLocations(query);
      setSuggestions(results);
    }, delay);

    return () => clearTimeout(timeout);
  }, [query, delay]);

  return { suggestions, setSuggestions };
};

export default useFetchLocations;