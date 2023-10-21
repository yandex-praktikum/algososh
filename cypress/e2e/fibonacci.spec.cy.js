describe('Тестирование страницы компонента "Фибоначчи"', () => {
  beforeEach(() => {
    cy.visit('/fibonacci')
  });

  //Проверка, что если в инпуте пусто, то кнопка добавления недоступна
  it('Кнопка недоступна при пустом инпуте', function () {
    cy.get('input').should('be.empty');
    cy.get('button').should('be.disabled');
  })

  //Проверка, что числа генерируются корректно
  it('Корректная работа функции', function () {
    cy.clock()
    cy.get('input').type('4');
    cy.contains('Рассчитать').click();

    cy.tick(500)
    cy.get('div[class*="circle_circle"]').should('have.length', '1').should('have.text', '1')

    cy.tick(500)
    cy.wait(500)
    cy.get('div[class*="circle_circle"]').should('have.length', '2').should('have.text', '11')

    cy.tick(500)
    cy.wait(500)
    cy.get('div[class*="circle_circle"]').should('have.length', '3').should('have.text', '112')

    cy.tick(500)
    cy.wait(500)
    cy.get('div[class*="circle_circle"]').should('have.length', '4').should('have.text', '1123')

    cy.tick(500)
    cy.wait(500)
    cy.get('div[class*="circle_circle"]').should('have.length', '5').should('have.text', '11235')

  })
})