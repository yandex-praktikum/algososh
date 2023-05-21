import React from 'react';
import renderer from 'react-test-renderer'

import { Circle } from './circle'

it('Компонент Circle без буквы рендерится без ошибок', () => {
  const tree = renderer
    .create(<Circle letter='' />)
    .toJSON()

    expect(tree).toMatchSnapshot()
})

it('Компонент Circle с буквами рендерится без ошибок', () => {
  const tree = renderer
    .create(<Circle letter='R' />)
    .toJSON()

    expect(tree).toMatchSnapshot()
})

it('Компонент Circle с head рендерится без ошибок', () => {
  const tree = renderer
    .create(<Circle letter='B' head='head'/>)
    .toJSON()

    expect(tree).toMatchSnapshot()
})

it('Компонент Circle с реакт-компонентом в head рендерится без ошибок', () => {
  const tree = renderer
    .create(<Circle letter='D' head={<Circle letter='d' />} />)
    .toJSON()

    expect(tree).toMatchSnapshot()
})

it('Компонент Circle с tail рендерится без ошибок', () => {
  const tree = renderer
    .create(<Circle letter='T' tail='tail'/>)
    .toJSON()

    expect(tree).toMatchSnapshot()
})

it('Компонент Circle с реакт-компонентом в tail рендерится без ошибок', () => {
  const tree = renderer
    .create(<Circle letter='A' tail={<Circle letter='a'/>}/>)
    .toJSON()

    expect(tree).toMatchSnapshot()
})

it('Компонент Circle с индексом рендерится без ошибок', () => {
  const tree = renderer
    .create(<Circle index={1} letter='t'/>)
    .toJSON()

    expect(tree).toMatchSnapshot()
})

it('Компонент Circle с опцией isSmall рендерится без ошибок', () => {
  const tree = renderer
    .create(<Circle isSmall={true} letter='S'/>)
    .toJSON()

    expect(tree).toMatchSnapshot()
})

it('Компонент Circle в состоянии default рендерится без ошибок', () => {
  const tree = renderer
    .create(<Circle letter='D' state='default'/>)
    .toJSON()

    expect(tree).toMatchSnapshot()
})

it('Компонент Circle в состоянии changing рендерится без ошибок', () => {
  const tree = renderer
    .create(<Circle letter='C' state='changing'/>)
    .toJSON()

    expect(tree).toMatchSnapshot()
})

it('Компонент Circle в состоянии modified рендерится без ошибок', () => {
  const tree = renderer
    .create(<Circle letter='M' state='modified'/>)
    .toJSON()

    expect(tree).toMatchSnapshot()
})







