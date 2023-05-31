import { fibonacci } from '../../src/utils/fibonacci'
import { submitFormSelector, inputNumberSelector, letterSelector, SMALL_DELAY, formSelector } from './consts'

const N = 10

describe('fibonacci function works correctly', () => {
  beforeEach(() => {
    cy.visit('fibonacci')
  })

  it('should be disabled button when there is no number to count', () => {
    cy.contains('Рассчитать').should('have.attr', 'disabled')
  })

  it('should animate couning correct fibonscci number', () => {
    cy.get(inputNumberSelector).type(N)
    cy.get(submitFormSelector).click()

    cy.get(formSelector).next().as('container')

    for (let i = 0; i < N + 1; i++) {
      cy.get('@container').children('div').eq(i).find(letterSelector).then(($p) => {
        const n = $p.text()

        if (i === 0 || i === 1) {
          expect(n, 'text').to.equal('1')
        } else {
          expect(n, 'text').to.equal(String(fibonacci(i)))
        }
      })
    }
    // eslint-disable-next-line
    cy.wait(SMALL_DELAY)
  })
})
