/// <reference types="cypress" />

context('Basic test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should render a canvas', () => {
    cy.get('canvas');
  });
});