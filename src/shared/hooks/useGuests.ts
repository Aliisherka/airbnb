import { useState } from "react";
import { useTranslation } from "react-i18next";

export const useGuests = () => {
  const { t } = useTranslation();
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [pets, setPets] = useState(0);

  const increment = (type: 'adults' | 'children' | 'infants' | 'pets') => {
    if (type !== 'adults' && adults === 0) setAdults(1);

    switch (type) {
      case 'adults':
        setAdults(prev => prev + 1);
        break;
      case 'children':
        setChildren(prev => prev + 1);
        break;
      case 'infants':
        setInfants(prev => prev + 1);
        break;
      case 'pets':
        setPets(prev => prev + 1);
        break;
    }
  };

  const decrement = (type: 'adults' | 'children' | 'infants' | 'pets') => {
    switch (type) {
      case 'adults':
        setAdults(prev => {
          const hasDependentGuests = children > 0 || infants > 0 || pets > 0;
          if (prev > 1) return prev - 1;
          if (prev === 1 && !hasDependentGuests) return 0;
          return prev;
        });
        break;
      case 'children':
        setChildren(prev => Math.max(0, prev - 1));
        break;
      case 'infants':
        setInfants(prev => Math.max(0, prev - 1));
        break;
      case 'pets':
        setPets(prev => Math.max(0, prev - 1));
        break;
    }
  };

  const guestsString = () => {
    const guestsCount = adults + children;
    const infantsCount = infants === 0 ? '' : `, ${t('infants', { count: infants })}`;
    const petsCount = pets === 0 ? '' : `, ${t('pets', { count: pets })}`;
    if (guestsCount === 0) return '';
    return `${t('guests', { count: guestsCount })}${infantsCount}${petsCount}`;
  };

  return {
    adults,
    setAdults,
    children,
    setChildren,
    infants,
    setInfants,
    pets,
    setPets,
    increment,
    decrement,
    guestsString,
  };
}