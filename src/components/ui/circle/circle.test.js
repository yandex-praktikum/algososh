import renderer from 'react-test-renderer';
import { ElementStates } from '../../../types/element-states';
import { Circle } from './circle';

describe('тестирование компонента - Circle', () => {
  it('без буквы', () => {
    const tree = renderer.create(<Circle />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('с буквами (Snapshot)', () => {
    const tree = renderer.create(<Circle letter="A1" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('с head (Snapshot)', () => {
    const tree = renderer.create(<Circle head />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('с react-элементом в head', () => {
    const tree = renderer.create(<Circle head={<Circle />} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('с tail', () => {
    const tree = renderer.create(<Circle tail />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('с react-элементом в tail', () => {
    const tree = renderer.create(<Circle tail={<Circle />} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('с index', () => {
    const tree = renderer.create(<Circle index />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('с пропом isSmall === true', () => {
    const tree = renderer.create(<Circle isSmall={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('в состоянии default', () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Default} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('в состоянии changing', () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Changing} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('в состоянии modified', () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Modified} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});