import { bubbleSortSteps } from '../../utils/sorts'

describe('Алгоритм сортировки пузырьком работает корректно', () => {
  it('Пустой массив корректно сортируется', () => {
    const arr = []
    const sortedArr = bubbleSortSteps(arr).pop()

    expect(sortedArr).toStrictEqual([])
  })

  it('Массив из одного числа корректно сортируется', () => {
    const arr = [5]
    const sortedArr = bubbleSortSteps(arr).pop()

    expect(sortedArr).toStrictEqual([5])
  })

  it('Массив корректно сортируется по убыванию', () => {
    const arr = [5, 9, 3, 1, 4]
    const sortedArr = bubbleSortSteps(arr, 'desc').pop()

    expect(sortedArr).toStrictEqual([9, 5, 4, 3, 1])
  })

  it('Массив корректно сортируется по возрастанию', () => {
    const arr = [5, 9, 3, 1, 4]
    const sortedArr = bubbleSortSteps(arr).pop()

    expect(sortedArr).toStrictEqual([1, 3, 4, 5, 9])
  })
})
