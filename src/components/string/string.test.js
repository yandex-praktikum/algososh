import { reverseStringAlgorythmSteps } from '../../utils/reverse-string'

describe('Алгоритм разворота строки работает корректно', () => {
  it('Корректно разворачивается строка с четным количеством символов', () => {
    const text = 'Text'
    const reversetText = reverseStringAlgorythmSteps(text).pop().join('')

    expect(reversetText).toBe('txeT')
  })

  it('Корректно разворачивается строка с нечетным количеством символов', () => {
    const text = 'Hello'
    const reversetText = reverseStringAlgorythmSteps(text).pop().join('')

    expect(reversetText).toBe('olleH')
  })

  it('Корректно разворачивается строка с одним символом', () => {
    const text = 't'
    const reversetText = reverseStringAlgorythmSteps(text).pop().join('')

    expect(reversetText).toBe('t')
  })

  it('Корректно разворачивается пустая строка', () => {
    const text = ''
    const reversetText = reverseStringAlgorythmSteps(text).pop().join('')

    expect(reversetText).toBe('')
  })
})
