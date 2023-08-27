import { SHORT_DELAY_IN_MS, DELAY_IN_MS } from "../../src/constants/delays";

describe('Список', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/list');
    });

    it('Если в инпуте пусто, то кнопка добавления недоступна', () => {
        cy.get('input').should('have.value', '');

        cy.contains('Добавить в head').as('addToHeadBtn');
        cy.get('@addToHeadBtn').should('be.disabled');

        cy.contains('Добавить в tail').as('addToTailBtn');
        cy.get('@addToTailBtn').should('be.disabled');

        cy.contains('Добавить по индексу').as('addByIndexBtn');
        cy.get('@addByIndexBtn').should('be.disabled');

        cy.contains('Удалить по индексу').as('delByIndexBtn');
        cy.get('@delByIndexBtn').should('be.disabled');
    });

    it('Отрисовка дефолтного списка', () => {
        cy.get('[class^="circle_circle"]').then((items) => {
            const count = items.length;
            for (let i = 0; i < count; i++) {
                cy.get(items[i]).invoke("attr", "class")
                    .then((className) => expect(className).contains('circle_default'));
            }
            cy.get(items[0]).parent().should('contains.text', 'head');
            cy.get(items[count - 1]).parent().should('contains.text', 'tail')
        });
    });

    it('Добавление элемента в head', () => {
        cy.get('input').eq(0).type(4);
        cy.contains('Добавить в head').as('addToHeadBtn');
        cy.get('@addToHeadBtn').should('be.enabled');
        cy.get('@addToHeadBtn').click();

        cy.get('[class^="circle_circle"]').then((items) => {
            cy.get(items[0]).parent().should('contains.text', '4');
            cy.get(items[0]).parent().should('not.contains.text', 'head');
            cy.get(items[0]).invoke("attr", "class")
                .then((className) => expect(className).contains('circle_changing'));
        });

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get('[class^="circle_circle"]').then((items) => {
            cy.get(items[0]).parent().should('contains.text', '4');
            cy.get(items[0]).invoke("attr", "class")
                .then((className) => expect(className).contains('circle_modified'));
            cy.get(items[0]).parent().should('contains.text', 'head');

        });

        cy.wait(DELAY_IN_MS);

        cy.get('[class^="circle_circle"]').then((items) => {
            cy.get(items[0]).parent().should('contains.text', '4');
            cy.get(items[0]).invoke("attr", "class")
                .then((className) => expect(className).contains('circle_default'));
            cy.get(items[0]).parent().should('contains.text', 'head');
        });
    });

    it('Добавление элемента в tail', () => {
        cy.get('input').eq(0).type(4);
        cy.contains('Добавить в tail').as('addToTailBtn');
        cy.get('@addToTailBtn').should('be.enabled');
        cy.get('@addToTailBtn').click();

        cy.get('[class^="circle_circle"]').then((items) => {
            const count = items.length;

            cy.get(items[count - 2]).parent().should('contains.text', '4');
            cy.get(items[count - 2]).parent().should('not.contains.text', 'head');
            cy.get(items[count - 2]).invoke("attr", "class")
                .then((className) => expect(className).contains('circle_changing'));
        });

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get('[class^="circle_circle"]').then((items) => {
            const count = items.length;
            cy.get(items[count - 1]).parent().should('contains.text', '4');
            cy.get(items[count - 1]).invoke("attr", "class")
                .then((className) => expect(className).contains('circle_modified'));
            cy.get(items[count - 1]).parent().should('contains.text', 'tail');

        });

        cy.wait(DELAY_IN_MS);

        cy.get('[class^="circle_circle"]').then((items) => {
            const count = items.length;

            cy.get(items[count - 1]).parent().should('contains.text', '4');
            cy.get(items[count - 1]).invoke("attr", "class")
                .then((className) => expect(className).contains('circle_default'));
            cy.get(items[count - 1]).parent().should('contains.text', 'tail');
        });
    });

    it('Добавление элемента по индексу', () => {
        cy.get('input').eq(0).type(4);
        cy.get('input').eq(1).type(1);

        cy.contains('Добавить по индексу').as('addByIndexBtn');
        cy.get('@addByIndexBtn').should('be.enabled');
        cy.get('@addByIndexBtn').click();

        cy.get('[class^="circle_circle"]').then((items) => {
            cy.get(items[0]).parent().should('contains.text', '4');
            cy.get(items[0]).parent().should('not.contains.text', 'head');
            cy.get(items[0]).invoke("attr", "class")
                .then((className) => expect(className).contains('circle_changing'));
        });

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get('[class^="circle_circle"]').then((items) => {
            cy.get(items[1]).parent().should('contains.text', '4');
            cy.get(items[1]).parent().should('not.contains.text', 'head');
            cy.get(items[1]).invoke("attr", "class")
                .then((className) => expect(className).contains('circle_changing'));
        });

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get('[class^="circle_circle"]').then((items) => {
            cy.get(items[1]).parent().should('contains.text', '4');
            cy.get(items[1]).invoke("attr", "class")
                .then((className) => expect(className).contains('circle_modified'));
        });

        cy.wait(DELAY_IN_MS);

        cy.get('[class^="circle_circle"]').then((items) => {
            cy.get(items[1]).parent().should('contains.text', '4');
            cy.get(items[1]).invoke("attr", "class")
                .then((className) => expect(className).contains('circle_default'));
        });
    });

    it('Удаление элемента из head', () => {
        let data = [];
        cy.get('[class^="circle_circle"]').children().each((child) => {
            data.push(child.text());
        })

        cy.contains('Удалить из head').as('delByHeadBtn');
        cy.get('@delByHeadBtn').should('be.enabled');
        cy.get('@delByHeadBtn').click();

        cy.get('[class^="circle_circle"]').then((items) => {
            cy.get(items[0]).parent().should('contains.text', data[0]);
            cy.get(items[0]).parent().should('contains.text', 'head');
            cy.get(items[1]).invoke("attr", "class")
                .then((className) => expect(className).contains('circle_changing'));
            cy.get(items[0]).should('have.text', '');
        });

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get('[class^="circle_circle"]').then((items) => {
            cy.get(items[0]).should('have.text', data[1]);
            cy.get(items[1]).invoke("attr", "class")
                .then((className) => expect(className).contains('circle_changing'));
            cy.get(items[0]).parent().should('contains.text', 'head');

        });

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get('[class^="circle_circle"]').then((items) => {
            for (let i = 0; i < items.length; i++) {
                cy.get(items[i]).parent().should('contains.text', data[i + 1]);
                cy.get(items[i]).invoke("attr", "class")
                    .then((className) => expect(className).contains('circle_default'));
            }
            cy.get(items[0]).parent().should('contains.text', 'head');
        });
    });

    it('Удаление элемента из tail', () => {
        let data = [];
        cy.get('[class^="circle_circle"]').children().each((child) => {
            data.push(child.text());
        })

        cy.contains('Удалить из tail').as('delByTailBtn');
        cy.get('@delByTailBtn').should('be.enabled');
        cy.get('@delByTailBtn').click();

        cy.get('[class^="circle_circle"]').then((items) => {
            expect(items.length - 1).to.equal(data.length);

            const count = items.length;
            cy.get(items[count - 1]).parent().should('contains.text', data[count - 2]);
            cy.get(items[count - 1]).invoke("attr", "class")
                .then((className) => expect(className).contains('circle_changing'));
            cy.get(items[count - 2]).should('have.text', '');
        });

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get('[class^="circle_circle"]').then((items) => {
            expect(items.length - 1).to.equal(data.length);

            const count = items.length;

            cy.get(items[count - 1]).should('have.text', data[count - 2]);

            cy.get(items[count - 1]).invoke("attr", "class")
                .then((className) => expect(className).contains('circle_changing'));
            cy.get(items[0]).parent().should('contains.text', 'head');

        });

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get('[class^="circle_circle"]').then((items) => {
            for (let i = 0; i < items.length; i++) {
                cy.get(items[i]).parent().should('contains.text', data[i]);
                cy.get(items[i]).invoke("attr", "class")
                    .then((className) => expect(className).contains('circle_default'));
            }
            cy.get(items[0]).parent().should('contains.text', 'head');
        });
    });

    it('Удаление элемента по индексу', () => {
        let data = [];
        cy.get('[class^="circle_circle"]').children().each((child) => {
            data.push(child.text());
        })
        cy.get('input').eq(1).type(1);
        cy.contains('Удалить по индексу').as('delByIndexBtn');
        cy.get('@delByIndexBtn').should('be.enabled');
        cy.get('@delByIndexBtn').click();

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get('[class^="circle_circle"]').then((items) => {
            expect(items.length).to.equal(data.length);
            const count = items.length;
            cy.get(items[1]).parent().should('contains.text', data[1]);
            cy.get(items[0]).invoke("attr", "class")
                .then((className) => expect(className).contains('circle_changing'));
            cy.get(items[1]).should('have.text', '');
            cy.get(items[1]).invoke("attr", "class")
                .then((className) => expect(className).contains('circle_modified'));
        });

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get('[class^="circle_circle"]').then((items) => {
            const index = items.length > 1 ? 1 : 0;
            cy.get(items[index]).should('have.text', data[index === 0 ? 0 : index + 1]);

            cy.get(items[index]).invoke("attr", "class")
                .then((className) => expect(className).contains('circle_default'));
        });

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get('[class^="circle_circle"]').then((items) => {
            for (let i = 0, j = 0; i < items.length; i++, j++) {
                if (i == 1) {
                    j += 1;
                }
                cy.get(items[i]).parent().should('contains.text', data[j]);
                cy.get(items[i]).invoke("attr", "class")
                    .then((className) => expect(className).contains('circle_default'));
            }
            cy.get(items[0]).parent().should('contains.text', 'head');
        });
    });
});
