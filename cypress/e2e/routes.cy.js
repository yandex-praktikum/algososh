describe('Проверка переходов между страницами', () => {
    it('Поднялось на localhost', () => {
        cy.visit('/');
    });

    beforeEach(function () {
        cy.visit('/');
    });

    it('Переход на строку (recursion) работает', function () {
        cy.get('a[href*="recursion"]').click();
        cy.contains('Строка');
    });
    
    it('Переход на фибоначчи (fibonacci) работает', function () {
        cy.get('a[href*="fibonacci"]').click();
        cy.contains('Последовательность Фибоначчи');
    });
    
    it('Переход на сортировку массива (sorting) работает', function () {
        cy.get('a[href*="sorting"]').click();
        cy.contains('Сортировка массива');
    });
    
    it('Переход на стек (stack) работает', function () {
        cy.get('a[href*="stack"]').click();
        cy.contains('Стек');
    });
    
    it('Переход на очередь (queue) работает', function () {
        cy.get('a[href*="queue"]').click();
        cy.contains('Очередь');
    });
    
    it('Переход на связный список (list) работает', function () {
        cy.get('a[href*="list"]').click();
        cy.contains('Связный список');
    });
})