import { Circle } from './circle';
import { ElementStates } from '../../../types/element-states';
import renderer from 'react-test-renderer';

describe('Тестирование компонента Circle', () => {

  //Проверяем при помощи снэпшотов корректную отрисовку элемента:

  it('Circle без буквы рендерится без ошибок', () => {
    const circle = renderer
      .create(<Circle />)
      .toJSON()
    expect(circle).toMatchSnapshot()
  })

  it('Circle с буквами рендерится без ошибок', () => {
    const circle = renderer
      .create(<Circle letter='a' />)
      .toJSON()
    expect(circle).toMatchSnapshot()
  })

  it('Circle с head рендерится без ошибок', () => {
    const circle = renderer
      .create(<Circle head='a' />)
      .toJSON()
    expect(circle).toMatchSnapshot()
  })

  it('Circle с react-элементом в head рендерится без ошибок', () => {
    const circle = renderer
      .create(<Circle head={<Circle />} />)
      .toJSON()
    expect(circle).toMatchSnapshot()
  })

  it('Circle с tail рендерится без ошибок', () => {
    const circle = renderer
      .create(<Circle tail='a' />)
      .toJSON()
    expect(circle).toMatchSnapshot()
  })

  it('Circle с react-элементом в tail рендерится без ошибок', () => {
    const circle = renderer
      .create(<Circle tail={<Circle />} />)
      .toJSON()
    expect(circle).toMatchSnapshot()
  })

  it('Circle с index рендерится без ошибок', () => {
    const circle = renderer
      .create(<Circle index='0' />)
      .toJSON()
    expect(circle).toMatchSnapshot()
  })

  it('Circle с пропом isSmall ===  true рендерится без ошибок', () => {
    const circle = renderer
      .create(<Circle isSmall={true} />)
      .toJSON()
    expect(circle).toMatchSnapshot()
  })

  it('Circle в состоянии default рендерится без ошибок', () => {
    const circle = renderer
      .create(<Circle state={ElementStates.Default} />)
      .toJSON()
    expect(circle).toMatchSnapshot()
  })

  it('Circle в состоянии changing рендерится без ошибок', () => {
    const circle = renderer
      .create(<Circle state={ElementStates.Changing} />)
      .toJSON()
    expect(circle).toMatchSnapshot()
  })

  it('Circle в состоянии modified рендерится без ошибок', () => {
    const circle = renderer
      .create(<Circle state={ElementStates.Modified} />)
      .toJSON()
    expect(circle).toMatchSnapshot()
  })

})