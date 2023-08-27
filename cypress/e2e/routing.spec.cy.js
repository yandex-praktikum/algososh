describe('Переход по страницам', function () {
    beforeEach(function () {
        cy.visit('http://localhost:3000');
    });

    const checkMainLinks = () => {
        cy.get('a[href="/recursion"]').should('be.visible');
        cy.get('a[href="/fibonacci"]').should('be.visible');
        cy.get('a[href="/sorting"]').should('be.visible');
        cy.get('a[href="/stack"]').should('be.visible');
        cy.get('a[href="/queue"]').should('be.visible');
        cy.get('a[href="/list"]').should('be.visible');
    }

    it('Проверит доступность главной страницы', function () {
        checkMainLinks();
    });

    it('Проверит доступность страницы со строкой', function () {
        cy.get('a[href="/recursion"]').click();
        cy.contains('Строка');
        cy.contains('К оглавлению');
    });

    it('Проверит доступность страницы с последовательностью Фибоначчи', function () {
        cy.get('a[href="/fibonacci"]').click();
        cy.contains('Последовательность Фибоначчи');
        cy.contains('К оглавлению');
    });

    it('Проверит доступность страницы с сортировкой массива', function () {
        cy.get('a[href="/sorting"]').click();
        cy.contains('Сортировка массива');
        cy.contains('К оглавлению');
    });

    it('Проверит доступность страницы со стеком', function () {
        cy.get('a[href="/stack"]').click();
        cy.contains('Стек');
        cy.contains('К оглавлению');
    });

    it('Проверит доступность страницы с очередью', function () {
        cy.get('a[href="/queue"]').click();
        cy.contains('Очередь');
        cy.contains('К оглавлению');
    });

    it('Проверит доступность страницы со связным списком', function () {
        cy.get('a[href="/list"]').click();
        cy.contains('Связный список');
        cy.contains('К оглавлению');
    });

    it('Проверит возврат к главной странице', function () {
        cy.get('a[href="/recursion"]').click();
        cy.contains('К оглавлению').click();
        checkMainLinks();
    });
});
