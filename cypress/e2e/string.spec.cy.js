const testString = ['x', 'e', 'd', 'n', 'a', 'y']

describe('Тестирование страницы компонента "Строка"', () => {
  beforeEach(() => {
    cy.visit('/recursion')
  });

  //Проверка, что если в инпуте пусто, то кнопка добавления недоступна
  it('Кнопка недоступна при пустом инпуте', function () {
    cy.get('input').should('be.empty')
    cy.get('button').should('be.disabled');
  })
  //Проверка, что строка разворачивается корректно. Важно, чтобы у вас 
  //на каждом шаге анимации были проверки на корректность выполненной операции 
  //и корректность стилей.
  it('Компонент Строка работает корректно', function () {
    cy.clock()
    cy.get('input').type('yandex');
    cy.get('button').should('not.be.disabled').contains('Развернуть').click();

    cy.get('ul>li').as('array');

    // начальное состояние
    cy.get('@array')
      .should('have.length', 6)
      .each(($li) => {
        cy.get($li).find('[class^=circle_circle__]').as('circle');
        cy.get('@circle').should('have.css', 'border-color', 'rgb(0, 50, 255)');
      });
    //изменение состояния элементов
    cy.tick(1000)
    cy.get('@array')
      .should('have.length', 6)
      .each(($li, index, list) => {
        cy.get($li).find('[class^=circle_circle__]').as('circle');
        if (index === 0 ) {
          cy.get('@circle').should('have.css', 'border-color', 'rgb(127, 224, 81)');
          cy.get('@circle').should('contain.text', testString[index]);
        }
        if (index === (list.length - 1)) {
          cy.get('@circle').should('have.css', 'border-color', 'rgb(127, 224, 81)');
          cy.get('@circle').should('contain.text', testString[index]);
        }

        if (index === 1 || index === (list.length - 2)) {
          cy.get('@circle').should('have.css', 'border-color', 'rgb(210, 82, 225)');
        }
      });

    cy.tick(1000)
    cy.get('@array')
      .should('have.length', 6)
      .each(($li, index, list) => {
        cy.get($li).find('[class^=circle_circle__]').as('circle');
        if (index === 1 ) {
          cy.get('@circle').should('have.css', 'border-color', 'rgb(127, 224, 81)');
          cy.get('@circle').should('contain.text', testString[index]);
        }
        if (index === (list.length - 2)) {
          cy.get('@circle').should('have.css', 'border-color', 'rgb(127, 224, 81)');
          cy.get('@circle').should('contain.text', testString[index]);
        }

        if (index === 2 || index === (list.length - 3)) {
          cy.get('@circle').should('have.css', 'border-color', 'rgb(210, 82, 225)');
        }
      });

    cy.tick(1000)
    cy.get('@array')
      .should('have.length', 6)
      .each(($li, index, list) => {
        cy.get($li).find('[class^=circle_circle__]').as('circle');
        if (index === 1 || index === (list.length - 2)) {
          cy.get('@circle').should('have.css', 'border-color', 'rgb(127, 224, 81)');
          cy.get('@circle').should('contain.text', testString[index]);
        }
        if (index === 2 || index === (list.length - 3)) {
          cy.get('@circle').should('have.css', 'border-color', 'rgb(127, 224, 81)');
          cy.get('@circle').should('contain.text', testString[index]);
        }
      });


  })

})
