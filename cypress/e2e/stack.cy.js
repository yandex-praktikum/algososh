const DELAY = 500
const TEXT = 't'
const addedElements = 3
const checkClass = (classes, value) => { expect(classes).to.contain(value) }

describe('stack page works correctly', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/stack')
  })

  it('add button should be disabled when there is nothing to add', () => {
    cy.contains('Добавить').should('have.attr', 'disabled')
  })

  it('should animate adding new element correctly', () => {
    cy.get('form input[type="text"]').type(TEXT)
    cy.get('form button[type="submit"]').click()

    cy.get('form').next().children('div').last().as('top')

    cy.get('@top').find('p[class*="letter"]').should('have.text', TEXT)

    cy.get('@top').should('have.attr', 'class')
      .should(($class) => {
        checkClass($class, 'current')
      })

    // eslint-disable-next-line
    cy.wait(DELAY)

    cy.get('@top').find('div[class*="circle_circle"]').should('have.attr', 'class')
      .should(($class) => {
        checkClass($class, 'default')
      })
  })

  it('should delete element correctly', () => {
    for (let i = 0; i < addedElements; i++) {
      cy.get('form input[type="text"]').type(TEXT)
      cy.get('form button[type="submit"]').click()
    }

    cy.get('form').next().children('div').should('have.length', addedElements)
    cy.contains('Удалить').click()
    cy.get('form').next().children('div').should('have.length', addedElements - 1)
  })

  it('should clear stack correctly', () => {
    for (let i = 0; i < addedElements; i++) {
      cy.get('form input[type="text"]').type(TEXT)
      cy.get('form button[type="submit"]').click()
    }

    cy.get('form').next().children('div').should('have.length', addedElements)
    cy.contains('Очистить').click()
    cy.get('form').next().children('div').should('have.length', 0)
  })
})
