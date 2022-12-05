import { SHORT_DELAY_IN_MS} from '../../src/constants/delays';
import {circle, colorChanging, colorDefault} from './const';

describe('Е2Е тест Стэка', () => {
    before(() => {
        cy.visit('stack');
      });
    
    it('Кнопка добавления не доступна, если в инпуте пусто', () => {
        cy.get('input').clear();
        cy.contains('Добавить').should('be.disabled');
    });

    it('проверка добавления элемента в очередь', () => {
        cy.reload();
        cy.get('input').type('1');
        cy.get('button').contains('Добавить').click();
        cy.get(circle).eq(0).contains('1');
        cy.get(circle).eq(0).find(colorChanging);
        cy.get(circle).eq(0).find(colorDefault);
        cy.get(circle).eq(0).contains('top');
        cy.wait(SHORT_DELAY_IN_MS);
    
        cy.get('input').type('2');
        cy.get('button').contains('Добавить').click();
        cy.get(circle).eq(1).contains('2');
        cy.get(circle).eq(1).find(colorChanging);
        cy.get(circle).eq(1).find(colorDefault);
        cy.get(circle).eq(1).contains('top');
        cy.wait(SHORT_DELAY_IN_MS);
      });
    
      it('проверка удаления элемента из очереди', () => {
        cy.reload();
        cy.get('input').type('1');
        cy.get('button').contains('Добавить').click();
        cy.get(circle).eq(0).contains('1');
        cy.get(circle).eq(0).find(colorChanging);
        cy.get(circle).eq(0).find(colorDefault);
        cy.get(circle).eq(0).contains('top');
        cy.wait(SHORT_DELAY_IN_MS);
    
        cy.get('input').type('2');
        cy.get('button').contains('Добавить').click();
        cy.get(circle).eq(1).contains('2');
        cy.get(circle).eq(1).find(colorChanging);
        cy.get(circle).eq(1).find(colorDefault);
        cy.get(circle).eq(1).contains('top');
        cy.wait(SHORT_DELAY_IN_MS);
    
        cy.get('button').contains('Удалить').click();
        cy.get(circle).eq(1).find(colorChanging);
        cy.get(circle).eq(0).find(colorDefault);
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get(circle).eq(0).contains('top');
    
        cy.get('button').contains('Удалить').click();
        cy.get(circle).eq(0).find(colorChanging);
        cy.get(circle).should('have.length', 0);
        cy.wait(SHORT_DELAY_IN_MS);
      });
    
      it('проверка поведение кнопки «Очистить»', () => {
        cy.reload();
        cy.get('input').type('1');
        cy.get('button').contains('Добавить').click();
        cy.get(circle).eq(0).contains('1');
        cy.get(circle).eq(0).find(colorChanging);
        cy.get(circle).eq(0).find(colorDefault);
        cy.get(circle).eq(0).contains('top');
        cy.wait(SHORT_DELAY_IN_MS);
    
        cy.get('input').type('2');
        cy.get('button').contains('Добавить').click();
        cy.get(circle).eq(1).contains('2');
        cy.get(circle).eq(1).find(colorChanging);
        cy.get(circle).eq(1).find(colorDefault);
        cy.get(circle).eq(1).contains('top');
        cy.wait(SHORT_DELAY_IN_MS);
    
        cy.get('button').contains('Очистить').click();
        cy.get(circle).should('have.length', 0);
      });
});