describe('Тестирование страницы компонента "Список"', () => {
  beforeEach(() => {
    cy.visit('/list')
  });

  //Проверка, что если в инпуте пусто, то кнопки добавления и удаления недоступны
  it('Кнопка недоступна при пустом инпуте', function () {
    cy.get('input').should('be.empty')
    cy.contains('Добавить в head').should('be.disabled');
    cy.contains('Добавить в tail').should('be.disabled');
    cy.contains('Добавить по индексу').should('be.disabled');
  })
  //Проверка корректности отрисовки дефолтного списка
  it('Начальный список отрисовывается корректно', function () {
    cy.get('div[class*="circle_circle"]').should('have.length', 4)
      .invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_default'))

    cy.get('div[class*="circle_circle"]').then((elem) => {
      cy.get(elem[0])
        .children().should('have.text', '5')

      cy.get(elem[1])
        .children().should('have.text', '10')

      cy.get(elem[2])
        .children().should('have.text', '15')

      cy.get(elem[3])
        .children().should('have.text', '20')
    })

    cy.get('div[class*="circle_circle"]').should('have.length', 4)
      .invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_default'))
  })

  //Проверка корректности добавления
  it('Элемент корректно добавляется в head', function () {
    cy.clock()

    cy.get('input').first().type('cat')
    cy.contains('Добавить в head').click()
    cy.tick(500)
    cy.get('div[class*="circle_circle"]').contains('cat').parent()
      .invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_circle__xMxdD   circle_modified__-tITb'))
    cy.tick(500)

    cy.get('div[class*="circle_circle"]').then((elem) => {
      cy.get(elem[0])
        .children().should('have.text', 'cat')
      cy.get(elem[0])
        .invoke('attr', 'class')
        .then(classList => expect(classList).contains('circle_circle__xMxdD   circle_default__cxxRQ'))

      cy.get(elem[1])
        .children().should('have.text', '5')
      cy.get(elem[1])
        .invoke('attr', 'class')
        .then(classList => expect(classList).contains('circle_default'))

      cy.get(elem[2])
        .children().should('have.text', '10')
      cy.get(elem[2])
        .invoke('attr', 'class')
        .then(classList => expect(classList).contains('circle_default'))

      cy.get(elem[3])
        .children().should('have.text', '15')
      cy.get(elem[3])
        .invoke('attr', 'class')
        .then(classList => expect(classList).contains('circle_default'))

      cy.get(elem[4])
        .children().should('have.text', '20')
      cy.get(elem[4])
        .invoke('attr', 'class')
        .then(classList => expect(classList).contains('circle_default'))

    })

    cy.tick(500)

    cy.get('div[class*="circle_circle"]')
      .invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_default'))
  })

  it('Элемент корректно добавляется в tail', function () {
    cy.clock()

    cy.get('input').first().type('cat')
    cy.contains('Добавить в tail').click()
    cy.tick(500)
    cy.get('div[class*="circle_circle"]').contains('cat').parent()
      .invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_circle__xMxdD   circle_modified__-tITb'))
    cy.tick(500)

    cy.get('div[class*="circle_circle"]').then((elem) => {
      cy.get(elem[0])
        .children().should('have.text', '5')
      cy.get(elem[0])
        .invoke('attr', 'class')
        .then(classList => expect(classList).contains('circle_circle__xMxdD   circle_default__cxxRQ'))

      cy.get(elem[1])
        .children().should('have.text', '10')
      cy.get(elem[1])
        .invoke('attr', 'class')
        .then(classList => expect(classList).contains('circle_default'))

      cy.get(elem[2])
        .children().should('have.text', '15')
      cy.get(elem[2])
        .invoke('attr', 'class')
        .then(classList => expect(classList).contains('circle_default'))

      cy.get(elem[3])
        .children().should('have.text', '20')
      cy.get(elem[3])
        .invoke('attr', 'class')
        .then(classList => expect(classList).contains('circle_default'))

      cy.get(elem[4])
        .children().should('have.text', 'cat')
      cy.get(elem[4])
        .invoke('attr', 'class')
        .then(classList => expect(classList).contains('circle_default'))

    })

    cy.tick(500)

    cy.get('div[class*="circle_circle"]')
      .invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_default'))
  })

  it('Элемент корректно добавляется по индексу', function () {
    cy.clock()
    cy.get('input').first().type('cat')
    cy.get('input[name="index"]').type('1')
    cy.contains('Добавить по индексу').click()
    cy.tick(500)
    cy.get('div[class*="circle_circle"]').contains('cat').parent()
      .invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_small'))
    cy.get('div[class*="circle_circle"]').contains('cat').parent()
      .invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_changing'))
    cy.tick(500)

    cy.wait(500)
    cy.get('div[class*="circle_circle"]').then((elem) => {
      cy.get(elem[0])
        .children().should('have.text', '5')
      cy.get(elem[0])
        .invoke('attr', 'class')
        .then(classList => expect(classList).contains('circle_changing'))

      cy.get(elem[1])
        .children().should('have.text', 'cat')
      cy.get(elem[1])
        .invoke('attr', 'class')
        .then(classList => expect(classList).contains('circle_changing'))

      cy.get(elem[2])
        .children().should('have.text', '10')
      cy.get(elem[2])
        .invoke('attr', 'class')
        .then(classList => expect(classList).contains('circle_changing'))

      cy.get(elem[3])
        .children().should('have.text', '15')
      cy.get(elem[3])
        .invoke('attr', 'class')
        .then(classList => expect(classList).contains('circle_default'))

      cy.get(elem[4])
        .children().should('have.text', '20')
      cy.get(elem[4])
        .invoke('attr', 'class')
        .then(classList => expect(classList).contains('circle_default'))
    })

    cy.tick(500)

    cy.get('div[class*="circle_circle"]').then((elem) => {
      cy.get(elem[0])
        .children().should('have.text', '5')
      cy.get(elem[0])
        .invoke('attr', 'class')
        .then(classList => expect(classList).contains('circle_changing'))

      cy.get(elem[1])
        .children().should('have.text', 'cat')
      cy.get(elem[1])
        .invoke('attr', 'class')
        .then(classList => expect(classList).contains('circle_modified'))

      cy.get(elem[2])
        .children().should('have.text', '10')
      cy.get(elem[2])
        .invoke('attr', 'class')
        .then(classList => expect(classList).contains('circle_default'))

      cy.get(elem[3])
        .children().should('have.text', '15')
      cy.get(elem[3])
        .invoke('attr', 'class')
        .then(classList => expect(classList).contains('circle_default'))

      cy.get(elem[4])
        .children().should('have.text', '20')
      cy.get(elem[4])
        .invoke('attr', 'class')
        .then(classList => expect(classList).contains('circle_default'))
    })

    cy.tick(500)

    cy.get('div[class*="circle_circle"]').should('have.length', 5)
      .invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_default'))
  })
  // Проверка корректности удаления элементов
  it('Элемент корректно удаляется из head', function () {
    cy.clock()
    cy.contains('Удалить из head').click()
    cy.tick(500)
    cy.get('div[class*="circle_circle"]').then((elem) => {
      cy.get(elem[0])
        .children().should('have.text', '10')

      cy.get(elem[1])
        .children().should('have.text', '15')

      cy.get(elem[2])
        .children().should('have.text', '20')
    })
  })

  it('Элемент корректно удаляется из tail', function () {
    cy.clock()
    cy.contains('Удалить из tail').click()
    cy.tick(500)
    cy.get('div[class*="circle_circle"]').then((elem) => {
      cy.get(elem[0])
        .children().should('have.text', '5')

      cy.get(elem[1])
        .children().should('have.text', '10')

      cy.get(elem[2])
        .children().should('have.text', '15')
    })
  })

  it('Элемент корректно удаляется по индексу', function () {
    cy.clock()

    cy.get('input[name="index"]').type('2')
    cy.tick(500)
    cy.contains('Удалить по индексу').click()

    cy.tick(500)
    cy.wait(500)

    cy.tick(500)
    cy.wait(500)

    cy.tick(500)
    cy.wait(500)

    cy.tick(500)
    cy.wait(500)

    cy.get('div[class*="circle_circle"]').then((elem) => {
      cy.get(elem[0]).children().should('have.text', '5')

      cy.get(elem[1]).children().should('have.text', '15')

      cy.get(elem[2]).children().should('have.text', '20')
    })

    cy.get('div[class*="circle_circle"]').should('have.length', 3)
      .invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_circle__xMxdD   circle_modified__-tITb'))
  })

})