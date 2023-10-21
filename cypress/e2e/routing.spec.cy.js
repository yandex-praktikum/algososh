//Тестирование переходов по страницам

describe('Приложение корректно работает с переходами по страницам', function () {
  beforeEach(() => {
		cy.visit('http://localhost:3000');
	})

  it('Открывается главная страница', function () {
    cy.contains('МБОУ АЛГОСОШ');
  });

  it('Открывается страница с алгоритмом разворота строки', function () {
		cy.get('[href*="/recursion"]').click()
		cy.contains('Строка')
	});

  it('Открывается страница с алгоритмом "Последовательность Фибоначчи"', function () {
		cy.get('[href*="/fibonacci"]').click()
		cy.contains('Последовательность Фибоначчи')
	});

  it('Открывается страница с алгоритмами сортировки случайного массива', function () {
		cy.get('[href*="/sorting"]').click()
		cy.contains('Сортировка массива')
	});

  it('Открывается страница с алгоритмом работы стека', function () {
		cy.get('[href*="/stack"]').click()
		cy.contains('Стек')
	});

	it('Открывается страница с алгоритмом работы очереди', function () {
		cy.get('[href*="/queue"]').click()
		cy.contains('Очередь')
	});
	
	it('Открывается страница с алгоритмом работы связанного списка', function () {
		cy.get('[href*="/list"]').click()
		cy.contains('Связный список')
	});

})