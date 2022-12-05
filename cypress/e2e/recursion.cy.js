import {circle, colorModified, colorChanging, colorDefault} from './const';
import {DELAY_IN_MS} from '../../src/constants/delays'

describe('Е2е тестирование строки)', () => {
    before(() => {
        cy.visit('recursion');
      });

    it('Кнопка добавления не доступна, если в инпуте пусто', () => {
        cy.get('input').clear();
        cy.contains('Развернуть').should('be.disabled');
    });

    it('Разворот отображается правильно',() => {
        cy.get('input').type('12345');
        cy.get('button').contains('Развернуть').click();
    
        cy.get(circle).should('have.length', 5);
    
        cy.get(circle).eq(0).find(colorDefault).contains('1');
        cy.get(circle).eq(1).find(colorDefault).contains('2');
        cy.get(circle).eq(2).find(colorDefault).contains('3');
        cy.get(circle).eq(3).find(colorDefault).contains('4');
        cy.get(circle).eq(4).find(colorDefault).contains('5');
    
        cy.wait(DELAY_IN_MS);
    
        cy.get(circle).eq(0).find(colorModified).contains('5');
        cy.get(circle).eq(1).find(colorChanging).contains('2');
        cy.get(circle).eq(2).find(colorDefault).contains('3');
        cy.get(circle).eq(3).find(colorChanging).contains('4');
        cy.get(circle).eq(4).find(colorModified).contains('1');
    
        cy.wait(DELAY_IN_MS);
    
        cy.get(circle).eq(0).find(colorModified).contains('5');
        cy.get(circle).eq(1).find(colorModified).contains('4');
        cy.get(circle).eq(2).find(colorModified).contains('3');
        cy.get(circle).eq(3).find(colorModified).contains('2');
        cy.get(circle).eq(4).find(colorModified).contains('1');
    })
})