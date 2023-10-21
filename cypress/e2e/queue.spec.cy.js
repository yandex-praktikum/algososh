describe('Тестирование страницы компонента "Очередь"', () => {
  beforeEach(() => {
    cy.visit('/queue')
  });

  //Проверка, что если в инпуте пусто, то кнопка добавления недоступна
  it('Кнопка недоступна при пустом инпуте', function () {
    cy.get('input').should('be.empty')
    cy.contains('Добавить').should('be.disabled');
  })

  //Проверка правильности добавления элемента в очередь
  it('Добавление элемента в стек корректно', function () {
    cy.clock()
    cy.get('input').type('cat')
    cy.contains('Добавить').click()
    cy.tick(500)
    cy.get('div[class*="circle_circle"]').contains('cat').parent()
      .invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_circle__xMxdD   circle_default__cxxRQ'))
  })

  // //Проверка правильности удаления элемента из очереди
  it('Удаление элемента из стека корректно', function () {
    cy.clock()
    cy.get('input').type('cat')
    cy.contains('Добавить').click()
    cy.tick(500)
    cy.get('div[class*="circle_circle"]').contains('cat').parent()
      .invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_circle__xMxdD   circle_default__cxxRQ'))
    cy.tick(500)
    cy.contains('Удалить').click()
    cy.get('input').should('have.value', '')
    cy.get('div[class*="circle_circle"]').should('have.value', '')
  })

  //Проверка поведения кнопки "Очистить"
  it('Кнопка "Очистить" работает корректно', function () {
    cy.clock()
    cy.get('input').type('cat')
    cy.contains('Добавить').click()
    cy.tick(500)
    cy.get('div[class*="circle_circle"]').contains('cat').parent()
      .invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_circle__xMxdD   circle_default__cxxRQ'))
    cy.tick(500)  
    cy.get('input').type('dog')
    cy.contains('Добавить').click()
    cy.tick(500)
    cy.get('div[class*="circle_circle"]').contains('dog').parent()
      .invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_circle__xMxdD   circle_default__cxxRQ'))
    cy.tick(500)
    
    cy.get('input').type('frog')
    cy.contains('Добавить').click()
    cy.tick(500)
     cy.get('div[class*="circle_circle"]').contains('frog').parent()
      .invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_circle__xMxdD   circle_default__cxxRQ'))
    cy.tick(500)
    cy.contains('Очистить').click()
    cy.get('div[class*="circle_circle"]').should('have.value', '');
  })

})