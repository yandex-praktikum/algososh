import renderer from 'react-test-renderer';
import { Button } from './button';
import { render, getByText, fireEvent } from '@testing-library/react';

describe('Тестирует компонент Button', () => {
    it('Кнопка с текстом', () => {
        const component = renderer.create(<Button text='test' />);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it('Кнопка без текста', () => {
        const component = renderer.create(<Button />);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it('Заблокированная кнопка', () => {
        const component = renderer.create(<Button disabled />);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it('Кнопка с индикацией загрузки', () => {
        const component = renderer.create(<Button isLoader />);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it('Проверяет корректность вызова колбека при клике на кнопку', () => {
        const mockFunction = jest.fn();

        const { container } = render(<Button onClick={mockFunction} text='test' />);

        const button = getByText(container, 'test');

        fireEvent.click(button);

        expect(mockFunction).toBeCalledTimes(1);
    })
});
