
import { ElementStates } from '../../types/element-states';
import { Direction } from "../../types/direction";
import { selectionSort, bubbleSort } from './sorting-unit';

//произвольный массив для проверки
const randomArr = [
	{number: 7, state: ElementStates.Default},
	{number: 3, state: ElementStates.Default},
	{number: 9, state: ElementStates.Default},
	{number: 1, state: ElementStates.Default},
	{number: 8, state: ElementStates.Default}
]
//отсортированный массив для проверки
const sortArr = [
	{number: 9, state: ElementStates.Default},
	{number: 8, state: ElementStates.Default},
	{number: 7, state: ElementStates.Default},
	{number: 3, state: ElementStates.Default},
	{number: 1, state: ElementStates.Default}
]

//массив из одного элемента
const oneArr = [{number: 1, state: ElementStates.Default}]

describe('Тестирование алгоритмов сортировки выбором и пузырьком', () => {
	//сортировка выбором
	it('Корректно сортирует пустой массив', () => {
		expect(selectionSort([])).toEqual([]);
	});

	it('Корректно сортирует массив из одного элемента', 
  () => {
		expect(selectionSort(oneArr)).toEqual([{
			number: 1,
			state: ElementStates.Default
		}]);
	});

	it('Корректно сортирует массив из нескольких элементов', () => {
		expect(selectionSort(randomArr)).toStrictEqual(sortArr);
	});

	//сортировка пузырьком
	it('Корректно сортирует пустой массив', () => {
		expect(bubbleSort([])).toEqual([]);
	});
	it('Корректно сортирует массив из одного элемента', () => {
		expect(bubbleSort(oneArr)).toEqual([{
			number: 1,
			state: ElementStates.Default
		}]);

	});
	it('Корректно сортирует массив из нескольких элементов.', () => {
		expect(bubbleSort(randomArr)).toStrictEqual(sortArr);
	});
})