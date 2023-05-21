const DELAY = 1000;
const checkClass = (classes, value) => {expect(classes).to.contain(value)}
const SAMPLE_TEXT = 'hello'

describe('reverse string function works correctly', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/recursion')
  })

  it('should be disabled button when there is no text to revert', () => {
    cy.contains('Развернуть').should('have.attr', 'disabled')
  })

  it('should be animate reversing string correctly', () => {
    cy.get('form input[type="text"]').type(SAMPLE_TEXT)
    cy.get('form button[type="submit"]').click()

    cy.get('form').next().children('div').as('circles')

    // Количество символов в строке
    cy.get('@circles').should('have.length', 5)

    // Проверяем первый и последний элементы
    cy.get('@circles').first().as('0').should('have.attr', 'class')
      .should(($class) => {
        checkClass($class, 'current')
      })
    cy.get('@circles').last().as('4').should('have.attr', 'class')
      .should(($class) => {
        checkClass($class, 'current')
      })

    cy.get('@0').find('p[class*="letter"]').as('letter0').should('have.text', SAMPLE_TEXT[0])
    cy.get('@4').find('p[class*="letter"]').as('letter4').should('have.text', SAMPLE_TEXT[4])
    cy.wait(DELAY)

    // Первый и последний элементы отсортированы, следующие должны подсвечиваться текущими
    cy.get('@0').should('have.attr', 'class')
      .should(($class) => {
        checkClass($class, 'sorted')
      })
    cy.get('@4').should('have.attr', 'class')
      .should(($class) => {
        checkClass($class, 'sorted')
      })
    cy.get('@circles').eq(1).as('1').should('have.attr', 'class')
      .should(($class) => {
        checkClass($class, 'current')
      })
    cy.get('@circles').eq(3).as('3').should('have.attr', 'class')
      .should(($class) => {
        checkClass($class, 'current')
      })

    cy.get('@letter0').should('have.text', 'o')
    cy.get('@letter4').should('have.text', 'h')
    cy.get('@1').find('p[class*="letter"]').as('letter1').should('have.text', SAMPLE_TEXT[1])
    cy.get('@3').find('p[class*="letter"]').as('letter3').should('have.text', SAMPLE_TEXT[3])

    cy.wait(DELAY)

    // Второй и четвертый элементы отсортированы
    // Поскольку строка содержит нечетное количество символов, символ посередине сразу становится отсортированным
    cy.get('@1').should('have.attr', 'class')
      .should(($class) => {
        checkClass($class, 'sorted')
      })
    cy.get('@3').should('have.attr', 'class')
      .should(($class) => {
        checkClass($class, 'sorted')
      })
    cy.get('@circles').eq(2).should('have.attr', 'class')
      .should(($class) => {
        checkClass($class, 'sorted')
      })

    cy.get('@letter1').should('have.text', SAMPLE_TEXT[3])
    cy.get('@letter3').should('have.text', SAMPLE_TEXT[1])

  })

})
