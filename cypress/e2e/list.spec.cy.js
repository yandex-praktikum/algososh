const { circleDefault, circleChanging, circleModified } = require("./constants");

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
    cy.get('div[class*="circle_circle"]').as('uiCircle');
    cy.get('@uiCircle').should('have.length', 4)
      .invoke('attr', 'class')
      .then(classList => expect(classList).contains(circleDefault))

    cy.get('@uiCircle').then((elem) => {
      cy.get(elem[0])
        .children().should('have.text', '5')

      cy.get(elem[1])
        .children().should('have.text', '10')

      cy.get(elem[2])
        .children().should('have.text', '15')

      cy.get(elem[3])
        .children().should('have.text', '20')
    })

    cy.get('@uiCircle').should('have.length', 4)
      .invoke('attr', 'class')
      .then(classList => expect(classList).contains(circleDefault))
  })

  //Проверка корректности добавления
  it('Элемент корректно добавляется в head', function () {
    cy.get('div[class*="circle_circle"]').as('uiCircle');
    cy.clock()

    cy.get('input').first().type('cat')
    cy.contains('Добавить в head').click()
    cy.tick(500)
    cy.get('@uiCircle').contains('cat').parent()
      .invoke('attr', 'class')
      .then(classList => expect(classList).contains(circleModified))
    cy.tick(500)

    cy.get('@uiCircle').then((elem) => {
      cy.get(elem[0])
        .children().should('have.text', 'cat')
      cy.get(elem[0])
        .invoke('attr', 'class')
        .then(classList => expect(classList).contains(circleDefault))

      cy.get(elem[1])
        .children().should('have.text', '5')
      cy.get(elem[1])
        .invoke('attr', 'class')
        .then(classList => expect(classList).contains(circleDefault))

      cy.get(elem[2])
        .children().should('have.text', '10')
      cy.get(elem[2])
        .invoke('attr', 'class')
        .then(classList => expect(classList).contains(circleDefault))

      cy.get(elem[3])
        .children().should('have.text', '15')
      cy.get(elem[3])
        .invoke('attr', 'class')
        .then(classList => expect(classList).contains(circleDefault))

      cy.get(elem[4])
        .children().should('have.text', '20')
      cy.get(elem[4])
        .invoke('attr', 'class')
        .then(classList => expect(classList).contains(circleDefault))

    })

    cy.tick(500)

    cy.get('@uiCircle')
      .invoke('attr', 'class')
      .then(classList => expect(classList).contains(circleDefault))
  })

  it('Элемент корректно добавляется в tail', function () {
    cy.get('div[class*="circle_circle"]').as('uiCircle');
    cy.clock()

    cy.get('input').first().type('cat')
    cy.contains('Добавить в tail').click()
    cy.tick(500)
    cy.get('@uiCircle').contains('cat').parent()
      .invoke('attr', 'class')
      .then(classList => expect(classList).contains(circleModified))
    cy.tick(500)

    cy.get('@uiCircle').then((elem) => {
      cy.get(elem[0])
        .children().should('have.text', '5')
      cy.get(elem[0])
        .invoke('attr', 'class')
        .then(classList => expect(classList).contains(circleDefault))

      cy.get(elem[1])
        .children().should('have.text', '10')
      cy.get(elem[1])
        .invoke('attr', 'class')
        .then(classList => expect(classList).contains(circleDefault))

      cy.get(elem[2])
        .children().should('have.text', '15')
      cy.get(elem[2])
        .invoke('attr', 'class')
        .then(classList => expect(classList).contains(circleDefault))

      cy.get(elem[3])
        .children().should('have.text', '20')
      cy.get(elem[3])
        .invoke('attr', 'class')
        .then(classList => expect(classList).contains(circleDefault))

      cy.get(elem[4])
        .children().should('have.text', 'cat')
      cy.get(elem[4])
        .invoke('attr', 'class')
        .then(classList => expect(classList).contains(circleDefault))

    })

    cy.tick(500)

    cy.get('@uiCircle')
      .invoke('attr', 'class')
      .then(classList => expect(classList).contains(circleDefault))
  })

  it('Элемент корректно добавляется по индексу', function () {
    cy.get('div[class*="circle_circle"]').as('uiCircle');
    cy.clock()
    cy.get('input').first().type('cat')
    cy.get('input[name="index"]').type('1')
    cy.contains('Добавить по индексу').click()
    cy.tick(500)
    cy.get('@uiCircle').contains('cat').parent()
      .invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_small'))
    cy.get('@uiCircle').contains('cat').parent()
      .invoke('attr', 'class')
      .then(classList => expect(classList).contains(circleChanging))
    cy.tick(500)

    cy.wait(500)
    cy.get('@uiCircle').then((elem) => {
      cy.get(elem[0])
        .children().should('have.text', '5')
      cy.get(elem[0])
        .invoke('attr', 'class')
        .then(classList => expect(classList).contains(circleChanging))

      cy.get(elem[1])
        .children().should('have.text', 'cat')
      cy.get(elem[1])
        .invoke('attr', 'class')
        .then(classList => expect(classList).contains(circleChanging))

      cy.get(elem[2])
        .children().should('have.text', '10')
      cy.get(elem[2])
        .invoke('attr', 'class')
        .then(classList => expect(classList).contains(circleChanging))

      cy.get(elem[3])
        .children().should('have.text', '15')
      cy.get(elem[3])
        .invoke('attr', 'class')
        .then(classList => expect(classList).contains(circleDefault))

      cy.get(elem[4])
        .children().should('have.text', '20')
      cy.get(elem[4])
        .invoke('attr', 'class')
        .then(classList => expect(classList).contains(circleDefault))
    })

    cy.tick(500)

    cy.get('@uiCircle').then((elem) => {
      cy.get(elem[0])
        .children().should('have.text', '5')
      cy.get(elem[0])
        .invoke('attr', 'class')
        .then(classList => expect(classList).contains(circleChanging))

      cy.get(elem[1])
        .children().should('have.text', 'cat')
      cy.get(elem[1])
        .invoke('attr', 'class')
        .then(classList => expect(classList).contains(circleModified))

      cy.get(elem[2])
        .children().should('have.text', '10')
      cy.get(elem[2])
        .invoke('attr', 'class')
        .then(classList => expect(classList).contains(circleDefault))

      cy.get(elem[3])
        .children().should('have.text', '15')
      cy.get(elem[3])
        .invoke('attr', 'class')
        .then(classList => expect(classList).contains(circleDefault))

      cy.get(elem[4])
        .children().should('have.text', '20')
      cy.get(elem[4])
        .invoke('attr', 'class')
        .then(classList => expect(classList).contains(circleDefault))
    })

    cy.tick(500)

    cy.get('@uiCircle').should('have.length', 5)
      .invoke('attr', 'class')
      .then(classList => expect(classList).contains(circleDefault))
  })
  // Проверка корректности удаления элементов
  it('Элемент корректно удаляется из head', function () {
    cy.get('div[class*="circle_circle"]').as('uiCircle');
    cy.clock()
    cy.contains('Удалить из head').click()
    cy.tick(500)
    cy.get('@uiCircle').then((elem) => {
      cy.get(elem[0])
        .children().should('have.text', '10')

      cy.get(elem[1])
        .children().should('have.text', '15')

      cy.get(elem[2])
        .children().should('have.text', '20')
    })
  })

  it('Элемент корректно удаляется из tail', function () {
    cy.get('div[class*="circle_circle"]').as('uiCircle');
    cy.clock()
    cy.contains('Удалить из tail').click()
    cy.tick(500)
    cy.get('@uiCircle').then((elem) => {
      cy.get(elem[0])
        .children().should('have.text', '5')

      cy.get(elem[1])
        .children().should('have.text', '10')

      cy.get(elem[2])
        .children().should('have.text', '15')
    })
  })

  it('Элемент корректно удаляется по индексу', function () {
    cy.get('div[class*="circle_circle"]').as('uiCircle');
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

    cy.get('@uiCircle').then((elem) => {
      cy.get(elem[0]).children().should('have.text', '5')

      cy.get(elem[1]).children().should('have.text', '15')

      cy.get(elem[2]).children().should('have.text', '20')
    })

    cy.get('@uiCircle').should('have.length', 3)
      .invoke('attr', 'class')
      .then(classList => expect(classList).contains(circleModified))
  })

})