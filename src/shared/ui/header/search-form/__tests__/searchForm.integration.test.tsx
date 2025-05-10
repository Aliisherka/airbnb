vi.unmock('react-i18next')
import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { MemoryRouter } from 'react-router-dom'
import i18n from 'i18next'

i18n.init({
  lng: 'en',
  resources: {
    en: {
      translation: {
        'search-destinations': 'Search destinations',
        'add-dates': 'Add dates',
        'add-guests': 'Add guests',
      },
    },
  },
})

import SearchForm from '..'
import { expect, test, describe, vi } from 'vitest'

describe('SearchForm tests', () => {
  test('renders the search form correctly', () => {
    render(
      <MemoryRouter>
        <I18nextProvider i18n={i18n}>
          <SearchForm />
        </I18nextProvider>
      </MemoryRouter>
    )
    expect(screen.getByPlaceholderText(/Search destinations/i)).toBeInTheDocument()
    expect(screen.getAllByPlaceholderText(/Add dates/i)).toHaveLength(2)
    expect(screen.getByPlaceholderText(/Add guests/i)).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  test('checks input change in the location field', () => {
    render(
      <MemoryRouter>
        <I18nextProvider i18n={i18n}>
          <SearchForm />
        </I18nextProvider>
      </MemoryRouter>
    )
    const input = screen.getByPlaceholderText(/Search destinations/i)
    fireEvent.change(input, { target: { value: 'Almaty' } })
    expect(input).toHaveValue('Almaty')
  })
})