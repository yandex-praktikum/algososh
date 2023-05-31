import { submitFormSelector, inputTextSelector, SMALL_DELAY, letterSelector, tailSelector, headSelector } from './consts'

const TEXT = 't'
const addedElements = 3
const checkClass = (classes, value) => { expect(classes).to.contain(value) }

describe('queue page works correctly', () => {
  beforeEach(() => {
    cy.visit('queue')
  })

  it('add button should be disabled when there is nothing to add', () => {
    cy.contains('Добавить').should('have.attr', 'disabled')
  })

  it('should animate adding new element correctly', () => {
    cy.get('form').next().children('div').as('queue')

    for (let i = 0; i < addedElements; i++) {
      cy.get(inputTextSelector).type(TEXT + i)
      cy.get(submitFormSelector).click()

      cy.get('@queue').eq(i).find(letterSelector).should('have.text', TEXT + i)
      cy.get('@queue').eq(i).find(tailSelector).should('have.text', 'tail')
      cy.get('@queue').eq(0).find(headSelector).should('have.text', 'head')

      if (i > 0) {
        cy.get('@queue').eq(i - 1).find(tailSelector).should('not.have.text', 'tail')
      }

      // Анимация состояния добавленного элемента
      cy.get('@queue').eq(i).should('have.attr', 'class')
        .should(($class) => {
          checkClass($class, 'current')
        })

      // eslint-disable-next-line
      cy.wait(SMALL_DELAY)

      cy.get('@queue').eq(i).find('div[class*="circle_circle"]').should('have.attr', 'class')
        .should(($class) => {
          checkClass($class, 'default')
        })
    }
  })

  it('should delete element correctly', () => {
    cy.get('form').next().children('div').as('queue')

    for (let i = 0; i < addedElements; i++) {
      cy.get(inputTextSelector).type(TEXT + i)
      cy.get(submitFormSelector).click()
    }
    cy.contains('Удалить').click()

    cy.get('@queue').eq(0).should('have.attr', 'class')
      .should(($class) => {
        checkClass($class, 'current')
      })

    // eslint-disable-next-line
    cy.wait(SMALL_DELAY)

    cy.get('@queue').eq(0).find('div[class*="circle_circle"]').should('have.attr', 'class')
      .should(($class) => {
        checkClass($class, 'default')
      })

    cy.get('@queue').eq(0).find(letterSelector).should('have.text', '')
    cy.get('@queue').eq(0).find(headSelector).should('have.text', '')
    cy.get('@queue').eq(1).find(headSelector).should('have.text', 'head')
  })

  it('should clear queue correctly', () => {
    cy.get('form').next().children('div').as('queue')

    for (let i = 0; i < addedElements; i++) {
      cy.get(inputTextSelector).type(TEXT)
      cy.get(submitFormSelector).click()
    }

    // eslint-disable-next-line
    cy.wait(SMALL_DELAY)
    cy.contains('Очистить').click()
    cy.get('@queue').each(($el) => {
      expect($el.find(letterSelector).text()).to.eq('')
      expect($el.find(headSelector).text()).to.eq('')
      expect($el.find(tailSelector).text()).to.eq('')
    })
  })
})
