import { Circle } from './circle'
import renderer from 'react-test-renderer';
import { createElement } from "react";
import { ElementStates } from "../../../types/element-states";

describe('Тестирует компонент сircle', () => {
    it('Без буквы', () => {
        const component = renderer.create(<Circle />);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it('С буквами', () => {
        const component = renderer.create(<Circle letter='test' />);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it('С head', () => {
        const component = renderer.create(<Circle head='testHead' />);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it('С react-элементом в head', () => {
        const reactElement = createElement("div");
        const component = renderer.create(<Circle head={reactElement} />);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it('С tail', () => {
        const component = renderer.create(<Circle tail='testTail' />);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it('С react-элементом в tail', () => {
        const reactElement = createElement("div");
        const component = renderer.create(<Circle tail={reactElement} />);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it('С index', () => {
        const component = renderer.create(<Circle index={0} />);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it('С пропом isSmall === true', () => {
        const component = renderer.create(<Circle isSmall />);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it('В состоянии default', () => {
        const component = renderer.create(<Circle state={ElementStates.Default} />);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it('В состоянии changing', () => {
        const component = renderer.create(<Circle state={ElementStates.Changing} />);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it('В состоянии modified', () => {
        const component = renderer.create(<Circle state={ElementStates.Modified} />);
        expect(component.toJSON()).toMatchSnapshot();
    });
})
