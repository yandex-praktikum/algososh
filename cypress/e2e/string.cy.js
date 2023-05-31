const DELAY = 1000
const checkClass = (classes, value) => { expect(classes).to.contain(value) }
const SAMPLE_TEXT = 'hello'
const SAMPLE_TEXT_LENGTH = SAMPLE_TEXT.length

describe('reverse string function works correctly', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/recursion')
  })

  it('should be disabled button when there is no text to revert', () => {
    cy.contains('Развернуть').should('have.attr', 'disabled')
  })

  it('should animate reversing string correctly', () => {
    cy.get('form input[type="text"]').type(SAMPLE_TEXT)
    cy.get('form button[type="submit"]').click()

    cy.get('form').next().children('div').as('circles')

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

        cy.get('@circles').eq(i - 1).find('p[class*="letter"]').as('letter1').should('have.text', SAMPLE_TEXT[SAMPLE_TEXT_LENGTH - i])
        cy.get('@circles').eq(SAMPLE_TEXT_LENGTH - i).find('p[class*="letter"]').as('letter3').should('have.text', SAMPLE_TEXT[i - 1])
      }

      cy.get('@circles').eq(i).find('p[class*="letter"]').should('have.text', SAMPLE_TEXT[i])
      cy.get('@circles').eq(SAMPLE_TEXT_LENGTH - i - 1).find('p[class*="letter"]').should('have.text', SAMPLE_TEXT[SAMPLE_TEXT_LENGTH - i - 1])

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
