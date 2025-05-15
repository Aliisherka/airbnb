import { RefObject, useEffect } from 'react';

export const useOutsideClickHandler = (
  refs: RefObject<HTMLElement>[],
  onOutsideClick: () => void
) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (refs.every(ref => ref.current && !ref.current.contains(e.target as Node))) {
        onOutsideClick();
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [refs]);
};