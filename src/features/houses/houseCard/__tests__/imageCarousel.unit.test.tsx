import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { describe, expect, test } from "vitest";
import ImageCarousel from "../imageCarousel";

const images = [
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150?text=2',
  'https://via.placeholder.com/150?text=3'
];

describe('ImageCarousel', () => {
  test('renders carousel and switches images on next/prev buttons', async () => {
    render(
      <ImageCarousel title='Test Carousel' images={images} onClick={() => {}}/>
    )

    const slider = screen.getByTestId('slider');

    expect(slider).toHaveStyle('transform: translateX(-0%)');
    
    fireEvent.mouseEnter(screen.getByTestId('image-container'));
    const nextButton = screen.getByTestId('chevron-right');


    fireEvent.click(nextButton)
    await waitFor(() => {
      expect(slider).toHaveStyle('transform: translateX(-100%)');
    })

    const prevButton = screen.getByTestId('chevron-left');

    fireEvent.click(prevButton);
    await waitFor(() => {
      expect(slider).toHaveStyle('transform: translateX(-0%)');
    })
  })

  test('indicators switch when image changes', async () => {
    render(
      <ImageCarousel title='Test Carousel' images={images} onClick={() => {}}/>
    )

    const indicators = screen.getAllByTestId('carousel-indicator');
    expect(indicators[0].className).toMatch(/active/);

    fireEvent.mouseEnter(screen.getByTestId('image-container'));
    const nextButton = screen.getByTestId('chevron-right');

    fireEvent.click(nextButton);
    await waitFor(() => {
      expect(indicators[1].className).toMatch(/active/);
    })

    const prevButton = screen.getByTestId('chevron-left');

    fireEvent.click(prevButton);
    await waitFor(() => {
      expect(indicators[0].className).toMatch(/active/);
    })
  })
})