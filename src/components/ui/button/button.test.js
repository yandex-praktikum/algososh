

import { render, screen, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Button } from './button';

describe('Тестирование компонента Button', () => {
  //Проверяем при помощи снэпшотов корректную отрисовку:

  it('кнопка c текстом рендерится без ошибок', () => {
    const button = renderer
      .create(<Button text='Тест кнопки' />)
      .toJSON()
    expect(button).toMatchSnapshot()
  })

  it('кнопка без текста рендерится без ошибок', () => {
    const button = renderer
      .create(<Button />)
      .toJSON()
    expect(button).toMatchSnapshot()
  })

  it('кнопка заблокирована, рендерится без ошибок', () => {
    const button = renderer
      .create(<Button disabled />)
      .toJSON()
    expect(button).toMatchSnapshot()
  })

  it('кнопка c индикацией загрузки рендерится без ошибок', () => {
    const button = renderer
      .create(<Button isLoader={true} />)
      .toJSON()
    expect(button).toMatchSnapshot()
  })


  // Проверяем корректность вызова колбека при клике на кнопку:
  it('Нажатие на кнопку вызывает колбек', () => {
    window.alert = jest.fn();

    render(<Button onClick={() => { alert('Успешно') }} />)

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(window.alert).toHaveBeenCalledWith('Успешно');
  });
})