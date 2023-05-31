import { submitFormSelector, inputTextSelector, DELAY, formSelector, letterSelector } from './consts'

const checkClass = (classes, value) => { expect(classes).to.contain(value) }
const SAMPLE_TEXT = 'hello'
const SAMPLE_TEXT_LENGTH = SAMPLE_TEXT.length

describe('reverse string function works correctly', () => {
  beforeEach(() => {
    cy.visit('recursion')
  })

  it('should be disabled button when there is no text to revert', () => {
    cy.contains('Развернуть').should('have.attr', 'disabled')
  })

  it('should animate reversing string correctly', () => {
    cy.get(inputTextSelector).type(SAMPLE_TEXT)
    cy.get(submitFormSelector).click()

    cy.get(formSelector).next().children('div').as('circles')

    // Количество символов в строке
    cy.get('@circles').should('have.length', SAMPLE_TEXT_LENGTH)

    for (let i = 0; i < Math.floor(SAMPLE_TEXT_LENGTH / 2); i++) {
      cy.get('@circles').eq(i).should('have.attr', 'class')
        .should(($class) => {
          checkClass($class, 'current')
        })
      cy.get('@circles').eq(SAMPLE_TEXT_LENGTH - i - 1).should('have.attr', 'class')
        .should(($class) => {
          checkClass($class, 'current')
        })

      if (i - 1 >= 0) {
        cy.get('@circles').eq(i - 1).should('have.attr', 'class')
          .should(($class) => {
            checkClass($class, 'sorted')
          })
        cy.get('@circles').eq(SAMPLE_TEXT_LENGTH - i).should('have.attr', 'class')
          .should(($class) => {
            checkClass($class, 'sorted')
          })

        cy.get('@circles').eq(i - 1).find(letterSelector).as('letter1').should('have.text', SAMPLE_TEXT[SAMPLE_TEXT_LENGTH - i])
        cy.get('@circles').eq(SAMPLE_TEXT_LENGTH - i).find(letterSelector).as('letter3').should('have.text', SAMPLE_TEXT[i - 1])
      }

      cy.get('@circles').eq(i).find(letterSelector).should('have.text', SAMPLE_TEXT[i])
      cy.get('@circles').eq(SAMPLE_TEXT_LENGTH - i - 1).find(letterSelector).should('have.text', SAMPLE_TEXT[SAMPLE_TEXT_LENGTH - i - 1])

      // eslint-disable-next-line
      cy.wait(DELAY)
    }
    if (SAMPLE_TEXT_LENGTH % 2) {
      cy.get('@circles').eq(Math.floor(SAMPLE_TEXT_LENGTH / 2)).should('have.attr', 'class')
        .should(($class) => {
          checkClass($class, 'sorted')
        })
    }
  })
})
