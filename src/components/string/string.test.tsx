import renderer from 'react-test-renderer';
import { screen, render, getByTestId, getByDisplayValue, getByAltText, getAllByText, getByText, fireEvent, getByPlaceholderText, waitFor, getAllByTestId } from '@testing-library/react';
import { StringComponent } from './string';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

jest.mock('../../constants/delays', () => ({
    SHORT_DELAY_IN_MS: 0
}));

const setup = async (inputString: string, expectString: string) => {
    const str = inputString;
    const history = createMemoryHistory({ initialEntries: ['/home'] });
    const { container } = render(<Router history={history}><StringComponent /></Router >);
    const input = getByPlaceholderText(container, 'Введите текст');
    const button = getByText(container, 'Развернуть');
    fireEvent.change(input, {
        target: {
            value: str
        }
    });

    await waitFor(() => {
        expect(getByDisplayValue(container, str)).toBeDefined();
    })

    fireEvent.click(button);

    await waitFor(() => {
        expect(getByAltText(container, 'Загрузка.')).toBeDefined();
    })

    await waitFor(() =>
        expect(getByText(container, 'Развернуть')).toBeDefined()
        , { timeout: 5000 });

    const circles = container.querySelectorAll('.circle');
    const result: (string | null)[] = [];
    circles.forEach(circle => {
        result.push(circle.textContent);
    })

    expect(result.join('')).toBe(expectString);
}

describe('Тестирует разворот строки', () => {
    it('С чётным количеством символов', async () => {
        await setup('abab', 'baba');
        await setup('ab', 'ba');
        await setup('aaaa', 'aaaa');
    });

    it('С нечетным количеством символов', async () => {
        await setup('abc', 'cba');
        await setup('abcde', 'edcba');
        await setup('aaaaa', 'aaaaa');
    });

    it('С одним символом', async () => {
        await setup('a', 'a');
    });

    it('Пустую строку', async () => {
        const history = createMemoryHistory({ initialEntries: ['/home'] });
        const { container } = render(<Router history={history}><StringComponent /></Router >);
        const button = getByText(container, 'Развернуть');
        expect(button).toHaveStyle('disabled: ');
    });
})
