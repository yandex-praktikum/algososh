import { formSelector } from './consts'

describe('reverse string function works correctly', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('shows correct page after recursion string item click', () => {
    cy.get('a[href="/recursion"]').click()
    cy.location('pathname').should('include', '/recursion')
    cy.get(formSelector)
  })

  it('shows correct page after fibonacci item click', () => {
    cy.get('a[href="/fibonacci"]').click()
    cy.location('pathname').should('include', '/fibonacci')
    cy.get(formSelector)
  })

  it('shows correct page after sorting item click', () => {
    cy.get('a[href="/sorting"]').click()
    cy.location('pathname').should('include', '/sorting')
    cy.get(formSelector)
  })

  it('shows correct page after stack item click', () => {
    cy.get('a[href="/stack"]').click()
    cy.location('pathname').should('include', '/stack')
    cy.get(formSelector)
  })

  it('shows correct page after queue item click', () => {
    cy.get('a[href="/queue"]').click()
    cy.location('pathname').should('include', '/queue')
    cy.get(formSelector)
  })

  it('shows correct page after list item click', () => {
    cy.get('a[href="/list"]').click()
    cy.location('pathname').should('include', '/list')
    cy.get(formSelector)
  })
})
