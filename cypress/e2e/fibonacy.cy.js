import { circle } from './const';
import {DELAY_IN_MS} from '../../src/constants/delays'

describe('Тестирование работоспособности Фибоначчи', () => {
  before(() => {
    cy.visit('fibonacci');
  });

  it('Кнопка добавления не доступна, если в инпуте пусто', () => {
    cy.get('input').clear();
    cy.contains('Развернуть').should('be.disabled');
  });

  it('числа генерируются корректно', () => {
    cy.clock();
    cy.reload();
    cy.get('input').type('4').should('have.value', '4');
    cy.contains('Развернуть').click();  
    cy.get(circle).should('have.length', '1').last().contains('1');
    cy.tick(DELAY_IN_MS);
    cy.get(circle).should('have.length', '2').last().contains('1');
    cy.tick(DELAY_IN_MS);
    cy.get(circle).should('have.length', '3').last().contains('2');
    cy.tick(DELAY_IN_MS);
    cy.get(circle).should('have.length', '4').last().contains('3');
    cy.tick(DELAY_IN_MS);
    cy.get(circle).should('have.length', '5').last().contains('5');
  });
});