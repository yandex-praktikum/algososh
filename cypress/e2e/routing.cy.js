describe('reverse string function works correctly', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('shows correct page after recursion string item click', () => {
    cy.get('a[href="/recursion"]').click()
    cy.location('pathname', {timeout: 60000}).should('include', '/recursion')
    cy.get('form').should('have.length', 1)
  })

  it('shows correct page after fibonacci item click', () => {
    cy.get('a[href="/fibonacci"]').click()
    cy.location('pathname', {timeout: 60000}).should('include', '/fibonacci')
    cy.get('form').should('have.length', 1)
  })

  it('shows correct page after sorting item click', () => {
    cy.get('a[href="/sorting"]').click()
    cy.location('pathname', {timeout: 60000}).should('include', '/sorting')
    cy.get('form').should('have.length', 1)
  })

  it('shows correct page after stack item click', () => {
    cy.get('a[href="/stack"]').click()
    cy.location('pathname', {timeout: 60000}).should('include', '/stack')
    cy.get('form').should('have.length', 1)
  })

  it('shows correct page after queue item click', () => {
    cy.get('a[href="/queue"]').click()
    cy.location('pathname', {timeout: 60000}).should('include', '/queue')
    cy.get('form').should('have.length', 1)
  })

  it('shows correct page after list item click', () => {
    cy.get('a[href="/list"]').click()
    cy.location('pathname', {timeout: 60000}).should('include', '/list')
    cy.get('form').should('have.length', 1)
  })

})
