import { useState } from 'react';
import useFetchLocations from './useFetchLocations';

export const useQueryControl = () => {
  const [query, setQuery] = useState('');
  const { suggestions, setSuggestions } = useFetchLocations(query);

  return { query, setQuery, suggestions, setSuggestions };
};