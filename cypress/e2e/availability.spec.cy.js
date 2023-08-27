describe('Работоспособность приложения', function () {
    it('Проверяет, что приложение поднялось', function () {
        cy.visit('http://localhost:3000');
    });
}); 
