import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";


describe('Строка', () => {
    const modifiedState = "circle_modified";
    const defaultState = "circle_default";
    const changingState = "circle_changing";

    beforeEach(() => {
        cy.visit('http://localhost:3000/recursion');
    });

    it('Если в инпуте пусто, то кнопка добавления недоступна', () => {
        cy.get('button').last().as('button');
        cy.get('@button').contains('Развернуть');
        cy.get('@button').should('be.disabled');
        cy.get('input').should('have.value', '');
    });

    it('Строка разворачивается корректно', () => {
        const testString = 'abcd';

        cy.get('button').last().as('button');
        cy.get('@button').contains('Развернуть');
        cy.get('input').type(testString);
        cy.get('input').should('have.value', testString);
        cy.get('@button').should('be.enabled');
        cy.get('@button').click();
        cy.get('@button')
            .invoke("attr", "class")
            .then((className) => expect(className).contains('loader'));

        cy.get('[class^="circle_circle"]').then((items) => {
            items.each(item => {
                cy.get(items[item]).as('circle_left');
                cy.get(items[testString.length - item - 1]).as('circle_right');

                cy.get(items[item]).children().should('have.text', testString[item]);
                cy.get('@circle_left').invoke("attr", "class")
                    .then((className) => expect(className).contains(defaultState));
                cy.get('@circle_right').invoke("attr", "class")
                    .then((className) => expect(className).contains(defaultState));
            })
        });

        cy.get('@button').should('be.disabled');

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get('[class^="circle_circle"]').then((items) => {
            items.each(item => {
                cy.get(items[item]).as('circle_left');
                cy.get(items[testString.length - item - 1]).as('circle_right');

                cy.get(items[item]).children().should('have.text', testString[item]);

                cy.get('@circle_left').invoke("attr", "class")
                    .then((className) => expect(className).contains(item === 0 || item === 3 ? changingState : defaultState));
                cy.get('@circle_right').invoke("attr", "class")
                    .then((className) => expect(className).contains(item === 0 || item === 3 ? changingState : defaultState));
            })
        });

        cy.wait(SHORT_DELAY_IN_MS);
        cy.get('@button').should('be.disabled');

        cy.get('[class^="circle_circle"]').then((items) => {
            cy.get(items[0]).children().should('have.text', testString[3]);
            cy.get(items[3]).children().should('have.text', testString[0]);

            cy.get(items[0]).invoke("attr", "class")
                .then((className) => expect(className).contains(modifiedState));
            cy.get(items[3]).invoke("attr", "class")
                .then((className) => expect(className).contains(modifiedState));

            cy.get(items[1]).children().should('have.text', testString[1]);
            cy.get(items[2]).children().should('have.text', testString[2]);

            cy.get(items[1]).invoke("attr", "class")
                .then((className) => expect(className).contains(changingState));
            cy.get(items[2]).invoke("attr", "class")
                .then((className) => expect(className).contains(changingState));
        });

        cy.get('@button').should('be.disabled');

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get('[class^="circle_circle"]').then((items) => {
            items.each(item => {
                cy.get(items[item]).as('circle_left');
                cy.get(items[testString.length - item - 1]).as('circle_right');

                cy.get(items[item]).children().should('have.text', testString[testString.length - item - 1]);

                cy.get('@circle_left').invoke("attr", "class")
                    .then((className) => expect(className).contains(modifiedState));
                cy.get('@circle_right').invoke("attr", "class")
                    .then((className) => expect(className).contains(modifiedState));
            })
        });

        cy.get('@button').should('be.disabled');
        cy.get('input').should('have.value', '');
    });
});
