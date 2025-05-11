import { fireEvent, render, screen } from "@testing-library/react"
import React from "react"
import { MemoryRouter } from "react-router-dom"
import { describe, expect, test, vi } from "vitest"
import { Header } from ".."

vi.mock('../../../hooks/useIsMobile', async () => {
  return {
    default: vi.fn(() => true),
  }
})

describe('Mobile Header', () => {
  test('renders mobile search button and opens MobileSearchForm in modal', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    const openSearchBtn = screen.getByText('start-your-search');
    expect(openSearchBtn).toBeInTheDocument();

    fireEvent.click(openSearchBtn);

    expect(screen.getByText('where-to')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('search-destinations')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /clear-all/i })).toBeInTheDocument();
    expect(screen.getByTestId('search-button')).toBeInTheDocument()
  })
})