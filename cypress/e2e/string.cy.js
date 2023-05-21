const checkClass = (classes, value) => {expect(classes).to.contain(value)}

describe('reverse string function works correctly', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/recursion')
  })

  it('should be disabled button when there is no text to revert', () => {
    cy.contains('Развернуть').should('have.attr', 'disabled')
  })

  it('should be animate reversing string correctly', () => {
    cy.get('form input[type="text"]').type('hello')
    cy.get('form button[type="submit"]').click()

    cy.get('form').next().children('div').as('circles')

    // Количество символов в строке
    cy.get('@circles').should('have.length', 5)

    // Проверяем первый и последний элементы
    cy.get('@circles').first().as('1').should('have.attr', 'class')
      .should(($class) => {
        checkClass($class, 'current')
      })
    cy.get('@circles').last().as('5').should('have.attr', 'class')
      .should(($class) => {
        checkClass($class, 'current')
      })

    cy.get('@1').find('p[class*="letter"]').as('letter1').should('have.text', 'h')
    cy.get('@5').find('p[class*="letter"]').as('letter5').should('have.text', 'o')
    cy.wait(1000)

    // Первый и последний элементы отсортированы, следующие должны подсвечиваться текущими
    cy.get('@1').should('have.attr', 'class')
      .should(($class) => {
        checkClass($class, 'sorted')
      })
    cy.get('@5').should('have.attr', 'class')
      .should(($class) => {
        checkClass($class, 'sorted')
      })
    cy.get('@circles').eq(1).as('2').should('have.attr', 'class')
      .should(($class) => {
        checkClass($class, 'current')
      })
    cy.get('@circles').eq(3).as('4').should('have.attr', 'class')
      .should(($class) => {
        checkClass($class, 'current')
      })

    cy.get('@letter1').should('have.text', 'o')
    cy.get('@letter5').should('have.text', 'h')
    cy.get('@2').find('p[class*="letter"]').as('letter2').should('have.text', 'e')
    cy.get('@4').find('p[class*="letter"]').as('letter4').should('have.text', 'l')

    cy.wait(1000)

    // Второй и четвертый элементы отсортированы
    // Поскольку строка содержит нечетное количество символов, символ посередине сразу становится отсортированным
    cy.get('@2').should('have.attr', 'class')
      .should(($class) => {
        checkClass($class, 'sorted')
      })
    cy.get('@4').should('have.attr', 'class')
      .should(($class) => {
        checkClass($class, 'sorted')
      })
    cy.get('@circles').eq(2).should('have.attr', 'class')
      .should(($class) => {
        checkClass($class, 'sorted')
      })

    cy.get('@letter2').should('have.text', 'l')
    cy.get('@letter4').should('have.text', 'e')

  })

})
