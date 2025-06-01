import { render, screen, waitFor } from "@testing-library/react";
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

describe('HousePage desktop test', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('shows loading screen while fetching', async () => {
    

    (apiCall.getHouse as ReturnType<typeof vi.fn>).mockImplementation(() => 
      new Promise((resolve) => setTimeout(() => resolve(mockHouse), 1000))
    )

    render(
      <MemoryRouter initialEntries={['/house/1']}>
        <Routes>
          <Route path='/house/:id' element={<HousePage />}/>
        </Routes>
      </MemoryRouter>
    )
    
    await waitFor(() => {
      expect(screen.getByText(/server-waking-up/i)).toBeInTheDocument();
    });
    
    await waitFor(() => {
      expect(screen.queryByText(/server-waking-up/i)).not.toBeInTheDocument();
    });
  })

  test('renders house details after successful fetch', async () => {
    (apiCall.getHouse as ReturnType<typeof vi.fn>).mockResolvedValue(mockHouse);

    render(
      <MemoryRouter initialEntries={['/house/1']}>
        <Routes>
          <Route path='/house/:id' element={<HousePage />}/>
        </Routes>
      </MemoryRouter>
    )

    expect(await screen.findByText('Cozy House in Paris')).toBeInTheDocument();
    expect(screen.getByText(/Paris, France/)).toBeInTheDocument();
    expect(screen.getByAltText('Main image')).toHaveAttribute('src', 'img1.jpg');

    for (let i = 1; i <= 4; i++) {
      expect(screen.getByAltText(`House ${i}`)).toHaveAttribute('src', mockHouse.images[i]);
    }

    expect(screen.getByText(/guests/i)).toBeInTheDocument();
    expect(screen.getByText(/bedrooms/i)).toBeInTheDocument();
    expect(screen.getByText(/beds/i)).toBeInTheDocument();
    expect(screen.getByText(/baths/i)).toBeInTheDocument();
  })
})