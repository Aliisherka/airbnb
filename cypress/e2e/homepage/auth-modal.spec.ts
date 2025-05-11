

describe('Login Flow', () => {
  it('opens login modal, logs in with phone and password, and shows user avatar', () => {
    cy.get('[data-testid="user-button"]').click();

    cy.contains('button', 'Log in').click();

    cy.enterPhoneNumber('12345678')

    cy.enterPassword('12345678')

    cy.submitForm()

    cy.get('[data-testid="user-avatar"]', { timeout: 10000 }).should('be.visible');
  })
})