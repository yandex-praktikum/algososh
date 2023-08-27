import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe('Фибоначчи', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/fibonacci');
    });

    it('Если в инпуте пусто, то кнопка добавления недоступна', () => {
        cy.get('button').last().as('button');
        cy.get('@button').contains('Рассчитать');
        cy.get('@button').should('be.disabled');
        cy.get('input').should('have.value', '');
    });

    it('Числа генерируются корректно', () => {
        const testNumber = 4;
        const resNumbers = [1, 1, 2, 3, 5];

        const checkResNumber = (count, items) => {
            for (let i = 0; i <= count; i++) {
                cy.get(items[i]).should('have.text', resNumbers[i]);
            }
        }

        cy.get('input').type(testNumber);
        cy.get('input').should('have.value', testNumber);
        cy.get('button').last().as('button');
        cy.get('@button').should('be.enabled');
        cy.get('@button').click();
        cy.get('@button')
            .invoke("attr", "class")
            .then((className) => expect(className).contains('loader'));

        for (let i = 0; i < resNumbers.length; i++) {
            cy.get('[class^="text text_type_circle"]').then((items) => {
                checkResNumber(i, items);
            });
            cy.wait(SHORT_DELAY_IN_MS);
        }
    });
})
