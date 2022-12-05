import {circle, colorModified, colorChanging, colorDefault} from './const';
import { SHORT_DELAY_IN_MS, DELAY_IN_MS} from '../../src/constants/delays';

describe('Тестирование работоспособности Связного списока', () => {
    before(() => {
      cy.visit('list');
    });
  
    it('Кнопки не доступны, если в инпуте пусто', () => {
      cy.get('input').first().clear();
      cy.contains('Добавить в head').should('be.disabled');
      cy.contains('Добавить в tail').should('be.disabled');
      cy.contains('Добавить по индексу').should('be.disabled');
      cy.get('input').last().clear();
      cy.contains('Удалить по индексу').should('be.disabled');
    });
  
    it('отрисовка дефолтного списка', () => {
      cy.get('ul').children().should('not.have.length', '0');
      cy.get(circle).first().contains('head');
      cy.get(circle).last().contains('tail');
    });
  
    it('добавление элемента в head', () => {
      cy.reload();
      cy.get('input').first().type('hi');
      cy.get('button').contains('Добавить в head').click();
      cy.get(circle).eq(0).contains('hi');
      cy.get(circle).eq(0).find(colorModified);
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get(circle).eq(0).contains('head');
      cy.get(circle).eq(0).find(colorDefault);
      cy.get(circle).should('have.length', 5);
    });
  
    it('добавление элемента в tail', () => {
      cy.reload();
      cy.get('input').first().type('hi');
      cy.get('button').contains('Добавить в tail').click();
      cy.wait(DELAY_IN_MS);
      cy.get(circle).eq(4).find(colorModified);
      cy.get(circle).eq(4).contains('hi');
      cy.get(circle).eq(4).contains('tail');
      cy.get(circle).eq(4).find(colorDefault);
      cy.get(circle).should('have.length', 5);
    });
  
    it('добавление элемента по индексу', () => {
      cy.reload();
      cy.get('input').first().type('5');
      cy.get('input').last().type('2');
      cy.get('button').contains('Добавить по индексу').click();
  
      cy.get(circle).eq(0).contains('5');
      cy.get(circle).eq(0).find(colorChanging);
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get(circle).eq(1).contains('5');
      cy.get(circle).eq(0).find(colorChanging);
      cy.get(circle).eq(1).find(colorChanging);
      cy.get(circle).eq(2).contains('5');
      cy.get(circle).eq(0).find(colorChanging);
      cy.get(circle).eq(1).find(colorChanging);
      cy.get(circle).eq(2).find(colorChanging);
      cy.get(circle).eq(2).find(colorModified);
      cy.get(circle).eq(2).contains('5');
      cy.get(circle).eq(2).find(colorDefault);
      cy.get(circle).should('have.length', 5);
    });
  
    it('удаление элемента из head', () => {
      cy.reload();
      cy.get(circle).should('have.length', 4);
      cy.get('button').contains('Удалить из head').click();
      cy.get(circle).eq(0).find(colorChanging);
      cy.get(circle).eq(0).contains('head');
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get(circle).eq(0).find(colorDefault);
      cy.get(circle).eq(0).contains('head');
      cy.get(circle).should('have.length', 3);
    });
  
    it('удаление элемента из tail', () => {
      cy.reload();
      cy.get(circle).should('have.length', 4);
      cy.get('button').contains('Удалить из tail').click();
      cy.get(circle).eq(3).find(colorChanging);
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get(circle).eq(2).contains('tail');
      cy.get(circle).eq(2).find(colorDefault);
      cy.get(circle).should('have.length', 3);
    });
  
    it('удаление элемента по индексу', () => {
      cy.reload();
      cy.get('input').last().type('2');
      cy.get('button').contains('Удалить по индексу').click();
      cy.get(circle).eq(0).find(colorChanging);
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get(circle).eq(0).find(colorChanging);
      cy.get(circle).eq(1).find(colorChanging);
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get(circle).eq(0).find(colorChanging);
      cy.get(circle).eq(1).find(colorChanging);
      cy.get(circle).eq(2).find(colorChanging);
      cy.get(circle).eq(2).find(colorDefault);
      cy.get(circle).should('have.length', 3);
    });
  });