import { useRef, useState } from 'react';

export const useSwipeCarousel = (length: number) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const startXRef = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startXRef.current === null) return;
    const currentX = e.touches[0].clientX;
    setOffsetX(currentX - startXRef.current);
  };

  const handleTouchEnd = () => {
    if (offsetX < -50 && currentIndex < length - 1) {
      setCurrentIndex(i => i + 1);
    } else if (offsetX > 50 && currentIndex > 0) {
      setCurrentIndex(i => i - 1);
    }
    setOffsetX(0);
    startXRef.current = null;
  };

  return {
    currentIndex,
    offsetX,
    setCurrentIndex,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
};