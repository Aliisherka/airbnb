/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    enterPhoneNumber(phoneNumber: string): Chainable<Element>;
    enterPassword(password: string): Chainable<Element>;
    submitForm(): Chainable<Element>;
  }
}