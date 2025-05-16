import { RefObject, useEffect } from 'react';

export const useOutsideClickHandler = (
  refs: RefObject<HTMLElement>[],
  onOutsideClick: () => void
) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const clickedOutside = refs.every(ref => {
        const el = ref.current;
        return !el || !el.contains(e.target as Node);
      });
      if (clickedOutside) {
        onOutsideClick();
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [onOutsideClick, refs]);
};