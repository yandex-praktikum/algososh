describe('приложение запущено', function() {
  it('приложение доступно по адресу localhost:3000', function() {
    cy.visit('http://localhost:3000');
  });
});
