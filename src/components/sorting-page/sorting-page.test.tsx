import React from "react";
import { SortingPage } from "./sorting-page";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { screen, render, getByTestId, getByDisplayValue, getByAltText, getAllByText, getByText, fireEvent, getByPlaceholderText, waitFor, getAllByTestId } from '@testing-library/react';


jest.mock('../../constants/delays', () => ({
    SHORT_DELAY_IN_MS: 0
}));

const setup = async (method: 'По возрастанию' | 'По убыванию', alg: 'Выбор' | 'Пузырёк', arr: number[], expectArr: number[]) => {
    let i = 0;

    jest.spyOn(global.Math, 'random').mockImplementation(() => {
        i += 1;
        if (i > 2) {
            return arr[(i - 2) % arr.length] / 100;
        }

        return (arr.length - 3) / 15;
    });

    const history = createMemoryHistory({ initialEntries: ["/home"] });

    const { container } = render(
        <Router history={history}>
            <SortingPage />
        </Router>
    );

    const items = container.querySelector('.arrayContainer')?.querySelectorAll('.content');
    const sortButton = getByText(container, method);
    const algButton = getByText(container, alg);

    fireEvent.click(sortButton);
    fireEvent.click(algButton);

    await waitFor(() => {
        if (arr.length > 1) {
            expect(getByAltText(container, 'Загрузка.')).toBeDefined();
        }
    })

    await waitFor(() =>
        expect(getByText(container, method)).toBeDefined()
        , { timeout: 5000 });

    expect(items).toBeDefined();
    if (items && arr.length > 0) {
        expect(Array.from(items).map(item => Number(item.textContent))).toStrictEqual(expectArr);
    } else {
        expect(arr.length).toBe(items?.length);
        expect(items?.length).toBe(0);

    }
}


describe("Тестирует алгоритмы сортировки выбором и пузырьком", () => {
    it("По возрастанию пузырьком", async () => {
        await setup('По возрастанию', 'Пузырёк', [5, 4, 3, 2, 1], [1, 2, 3, 4, 5]);
        await setup('По возрастанию', 'Пузырёк', [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9]);
        await setup('По возрастанию', 'Пузырёк', [5, 5, 8, 5, 5, 5], [5, 5, 5, 5, 5, 8]);
        await setup('По возрастанию', 'Пузырёк', [1, 1, 1, 1, 1], [1, 1, 1, 1, 1]);
    });

    it("По возрастанию выбором", async () => {
        await setup('По возрастанию', 'Выбор', [5, 4, 3, 2, 1], [1, 2, 3, 4, 5]);
        await setup('По возрастанию', 'Выбор', [5, 4, 3,], [3, 4, 5]);
        await setup('По возрастанию', 'Выбор', [5, 4, 3, 2, 1, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]);
        await setup('По возрастанию', 'Выбор', [1], [1]);
        await setup('По возрастанию', 'Выбор', [], []);

    });

    it("По убыванию пузырьком", async () => {
        await setup('По убыванию', 'Пузырёк', [1, 4, 3, 2, 5], [5, 4, 3, 2, 1]);
        await setup('По убыванию', 'Пузырёк', [7, 6, 5, 4, 3, 2, 1], [7, 6, 5, 4, 3, 2, 1]);
        await setup('По убыванию', 'Пузырёк', [1, 2, 3, 3, 4, 5], [5, 4, 3, 3, 2, 1]);
        await setup('По убыванию', 'Пузырёк', [1, 4, 3, 2, 5], [5, 4, 3, 2, 1]);
    });

    it("По убыванию выбором", async () => {
        await setup('По убыванию', 'Выбор', [1, 4, 3, 2, 5], [5, 4, 3, 2, 1]);
        await setup('По убыванию', 'Выбор', [6, 5, 4, 3, 2, 1], [6, 5, 4, 3, 2, 1]);
        await setup('По убыванию', 'Выбор', [1, 2, 3, 4, 5], [5, 4, 3, 2, 1]);
        await setup('По убыванию', 'Выбор', [1, 2, 3, 3, 4, 5], [5, 4, 3, 3, 2, 1]);
    });

    it("Пустой массив", async () => {
        await setup('По возрастанию', 'Пузырёк', [], []);
        await setup('По возрастанию', 'Выбор', [], []);
        await setup('По убыванию', 'Пузырёк', [], []);
        await setup('По убыванию', 'Выбор', [], []);
    });

    it("Массив из одного элемента", async () => {
        await setup('По возрастанию', 'Пузырёк', [5], [5]);
        await setup('По возрастанию', 'Выбор', [5], [5]);
        await setup('По убыванию', 'Пузырёк', [5], [5]);
        await setup('По убыванию', 'Выбор', [5], [5]);
    });

    it("Массив из нескольких элементов", async () => {
        await setup('По возрастанию', 'Пузырёк', [5, 4, 3, 2, 1, 10], [1, 2, 3, 4, 5, 10]);
        await setup('По возрастанию', 'Выбор', [5, 4, 3, 2, 1, 10], [1, 2, 3, 4, 5, 10]);
        await setup('По убыванию', 'Пузырёк', [5, 4, 3, 2, 1, 10], [10, 5, 4, 3, 2, 1]);
        await setup('По убыванию', 'Выбор', [5, 4, 3, 2, 1, 10], [10, 5, 4, 3, 2, 1]);
    });
});
