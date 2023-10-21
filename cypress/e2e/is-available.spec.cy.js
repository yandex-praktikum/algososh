//Тестирование работоспособности приложения 
//тест, который будет проверять, что ваше приложение поднялось
describe('service is available', function() {
  it('should be available on localhost:3000', function() {
    cy.visit('http://localhost:3000');
  });
}); 