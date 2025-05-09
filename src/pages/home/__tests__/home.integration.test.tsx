import { render, screen, waitFor } from "@testing-library/react"
import React from "react"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"
import { expect, test } from "vitest"
import Home from ".."
import { store } from "../../../app/store"


test('renders house cards from real API', async () => {
  render(
    <MemoryRouter>
      <Provider store={store}>
        <Home />
      </Provider>
    </MemoryRouter>
  )

  await waitFor(() => {
    expect(screen.getAllByTestId('house-card').length).toBeGreaterThan(0)
  }, { timeout: 45000 })

  const title = screen.getAllByTestId('house-title')
  const prices = screen.getAllByTestId('house-prices')
  const ratings = screen.getAllByTestId('house-ratings')

  expect(title.length).toBeGreaterThan(0)
  expect(prices.length).toBeGreaterThan(0)
  expect(ratings.length).toBeGreaterThan(0)
}, 60000)