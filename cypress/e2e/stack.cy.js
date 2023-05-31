import { submitFormSelector, inputTextSelector, SMALL_DELAY, formSelector, letterSelector } from './consts'

const TEXT = 't'
const addedElements = 3
const checkClass = (classes, value) => { expect(classes).to.contain(value) }

describe('stack page works correctly', () => {
  beforeEach(() => {
    cy.visit('stack')
  })

  it('add button should be disabled when there is nothing to add', () => {
    cy.contains('Добавить').should('have.attr', 'disabled')
  })

  it('should animate adding new element correctly', () => {
    cy.get(inputTextSelector).type(TEXT)
    cy.get(submitFormSelector).click()

    cy.get(formSelector).next().children('div').last().as('top')

    cy.get('@top').find(letterSelector).should('have.text', TEXT)

    cy.get('@top').should('have.attr', 'class')
      .should(($class) => {
        checkClass($class, 'current')
      })

    // eslint-disable-next-line
    cy.wait(SMALL_DELAY)

    cy.get('@top').find('div[class*="circle_circle"]').should('have.attr', 'class')
      .should(($class) => {
        checkClass($class, 'default')
      })
  })

  it('should delete element correctly', () => {
    for (let i = 0; i < addedElements; i++) {
      cy.get(inputTextSelector).type(TEXT)
      cy.get(submitFormSelector).click()
    }

    cy.get(formSelector).next().children('div').should('have.length', addedElements)
    cy.contains('Удалить').click()
    cy.get(formSelector).next().children('div').should('have.length', addedElements - 1)
  })

  it('should clear stack correctly', () => {
    for (let i = 0; i < addedElements; i++) {
      cy.get(inputTextSelector).type(TEXT)
      cy.get(submitFormSelector).click()
    }

    cy.get(formSelector).next().children('div').should('have.length', addedElements)
    cy.contains('Очистить').click()
    cy.get(formSelector).next().children('div').should('have.length', 0)
  })
})
