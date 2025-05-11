/// <reference path="./commands.d.ts" />
import './commands'

beforeEach(() => {
  cy.visit('http://localhost:5173/airbnb/')
})