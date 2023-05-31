import { fibonacci } from '../../src/utils/fibonacci'

const DELAY = 500
const N = 10

describe('fibonacci function works correctly', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/fibonacci')
  })

  it('should be disabled button when there is no number to count', () => {
    cy.contains('Рассчитать').should('have.attr', 'disabled')
  })

  it('should animate couning correct fibonscci number', () => {
    cy.get('form input[type="number"]').type(N)
    cy.get('form button[type="submit"]').click()

    cy.get('form').next().as('container')

    for (let i = 0; i < N + 1; i++) {
      cy.get('@container').children('div').eq(i).find('p[class*="letter"]').then(($p) => {
        const n = $p.text()

        if (i === 0 || i === 1) {
          expect(n, 'text').to.equal('1')
        } else {
          expect(n, 'text').to.equal(String(fibonacci(i)))
        }
      })
    }
    // eslint-disable-next-line
    cy.wait(DELAY)
  })
})
