/// <reference types="cypress" />

context("Basic test", () => {
  beforeEach(() => {
    cy.visit("localhost:3000/");
  });

  it("should render react logo", () => {
    // https://on.cypress.io/focus
    cy.get(".App-logo");
  });
  it("should render a canvas", () => {
    // https://on.cypress.io/focus
    cy.get("canvas");
  });
});
