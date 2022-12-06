import renderer from 'react-test-renderer';
import { Button } from './button';
import { render, screen, fireEvent } from '@testing-library/react';

describe('Проверка компонента - Button', () => {
  it('Кнопка с текстом', () => {
    const tree = renderer.create(<Button text="text" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Кнопка без текста', () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Заблокированная кнопка', () => {
    const tree = renderer.create(<Button disabled={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Кнопка со спиннером', () => {
    const button = renderer.create(<Button isLoader={true} />).toJSON();
    expect(button).toMatchSnapshot();
  });

  //пример из лекции
  it('корректность вызова колбека при клике на кнопку', () => {
    window.alert = jest.fn();

    // Рендерим компонент
    render(<Button text="Рецепт пельменей" onClick={() => {alert('Ура! Пельмени!');}}/>);

    // Находим элемент ссылки
    const link = screen.getByText('Рецепт пельменей');

    // Имитируем нажатие на ссылку
    fireEvent.click(link);

    // Проверяем, что alert сработал с правильным текстом предупреждения
    expect(window.alert).toHaveBeenCalledWith('Ура! Пельмени!');
  });
});