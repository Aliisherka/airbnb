/// <reference types="cypress" />

Cypress.Commands.add('enterPhoneNumber', (phoneNumber: string) => {
  cy.get('input[type="tel"]').clear().type(phoneNumber)
})

Cypress.Commands.add('enterPassword', (password: string) => {
  cy.get('input[type="password"]').clear().type(password)
})

Cypress.Commands.add('submitForm', () => {
  cy.get('[data-testid="login-form"]').submit()
})
