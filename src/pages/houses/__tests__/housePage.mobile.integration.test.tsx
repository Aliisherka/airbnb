import { render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, test, vi } from "vitest";
import HousePage from "..";
import { apiCall } from '../../../shared/api';

vi.mock('../../../shared/api', () => ({
  apiCall: {
    getHouse: vi.fn(() => new Promise(resolve => setTimeout(() => resolve(null), 1000))),
    getReviews: vi.fn(() => Promise.resolve([])),
  }
}));

vi.mock('../../../shared/hooks/useIsMobile', () => ({
  default: vi.fn(() => true),
}));

const mockHouse = {
  id: '1',
  title: 'Cozy House in Paris',
  images: ['img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 'img5.jpg'],
  city: 'Paris',
  country: 'France',
  guests: 3,
  bedrooms: 2,
  beds: 2,
  bathrooms: 1,
  userId: {
    createdAt: '2025-03-12T10:00:00.168Z',
    name: 'example'
  },
  avgRating: 5,
  reviewCount: 2,
};

describe('HousePage mobile test', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders mobile version correctly', async () => {
    (apiCall.getHouse as ReturnType<typeof vi.fn>).mockResolvedValue(mockHouse);

    render(
      <MemoryRouter initialEntries={['/house/1']}>
        <Routes>
          <Route path='/house/:id' element={<HousePage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByTestId('back-button')).toBeInTheDocument();
    expect(screen.queryByAltText('Main image')).not.toBeInTheDocument();

    expect(await screen.findByText('Cozy House in Paris')).toBeInTheDocument();
    expect(screen.getByText(/Paris, France/)).toBeInTheDocument();

    mockHouse.images.forEach((img, index) => {
      const image = screen.getByAltText(`image ${index}`);
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', img);
    });
  });
});