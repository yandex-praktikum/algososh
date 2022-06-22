describe('проверка состояния кнопки', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000/recursion');
  });

  it('Кнопка верно меняет значение атрибута disabled', function() {
    cy.contains('Развернуть').as('button');
    cy.get('@button').should('be.disabled');
    cy.get('input').type('test')
    cy.get('@button').should('not.be.disabled');
    cy.get('input').clear()
    cy.get('@button').should('be.disabled');
  });


});
