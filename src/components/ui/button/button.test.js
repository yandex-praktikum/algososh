import React from 'react';
import renderer from 'react-test-renderer'
import { render, screen, fireEvent } from '@testing-library/react'

import { Button } from './button'

it('Кнопка с текстом рендерится без ошибок', () => {
  const tree = renderer
    .create(<Button text='Кнопка' />)
    .toJSON()

    expect(tree).toMatchSnapshot()
})

it('Кнопка без текста рендерится без ошибок', () => {
  const tree = renderer
    .create(<Button />)
    .toJSON()

    expect(tree).toMatchSnapshot()
})

it('Заблокированная кнопка рендерится без ошибок', () => {
  const tree = renderer
    .create(<Button disabled={true} text='Кнопка'/>)
    .toJSON()

    expect(tree).toMatchSnapshot()
})

it('Кнопка с лоадером рендерится без ошибок', () => {
  const tree = renderer
    .create(<Button isLoader={true}/>)
    .toJSON()

    expect(tree).toMatchSnapshot()
})

it('Обработчик клика по кнопке рендерится без ошибок', () => {
  const tree = renderer
    .create(<Button text='Нажми' onClick={() => alert('Click!')}/>)
    .toJSON()

    expect(tree).toMatchSnapshot()
})

it('Обработчик клика по кнопке вызывает корректный alert', () => {
  window.alert = jest.fn()

  render(<Button text='Нажми' onClick={() => alert('Click!')}/>)

  fireEvent.click(screen.getByText('Нажми'))

  expect(window.alert).toHaveBeenCalledWith('Click!')
})
