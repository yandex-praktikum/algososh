const DELAY = 1000
const TEXT = 'el'
const checkCircleElement = ({ el, value, state, type }) => {
  if (type === 'head') {
    el.find('div[class*="head"] div[class*="' + state + '"]')
      .should('have.length', 1)
      .and('have.text', value)
  } else if (type === 'tail') {
    el.find('div[class*="tail"] div[class*="' + state + '"]')
      .should('have.length', 1)
      .and('have.text', value)
  } else {
    el.find('div[class*="' + state + '"]').should('have.length', 1)
  }
}

describe('list page works correctly', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/list')
  })

  it('add and delete buttons should be disabled when there is nothing to add or delete', () => {
    const text = cy.get('form input[type="text"]').value
    const index = cy.get('form input[type="number"]').value

    if (!text) {
      cy.contains('Добавить в head').should('have.attr', 'disabled')
      cy.contains('Добавить в tail').should('have.attr', 'disabled')
    }
    if (!text || !index) {
      cy.contains('Добавить по индексу').should('have.attr', 'disabled')
      cy.contains('Удалить по индексу').should('have.attr', 'disabled')
    }
  })

  it('should display default list correctly', () => {
    let length = 0
    cy.get('form').next().children('div').as('list')
    // eslint-disable-next-line
    cy.wait(DELAY)
    cy.get('@list').then($list => (length = $list.length))

    // eslint-disable-next-line
    cy.wait(DELAY)

    cy.get('@list').each(($el, index) => {
      index === 0 && expect($el.find('div[class*="head"]')).have.text('head')
      index !== 0 && expect($el.find('div[class*="head"]')).have.text('')
      index === length - 1 && expect($el.find('div[class*="tail"]')).have.text('tail')
      index !== length - 1 && expect($el.find('div[class*="tail"]')).have.text('')

      expect($el.find('p[class*="letter"]')).not.have.text('')
      expect($el.find('div[class*="default"]')).to.have.length(1)
    })
  })

  it('should add head element correctly', () => {
    // eslint-disable-next-line
    cy.wait(DELAY)
    cy.get('form input[type="text"]').type(TEXT)
    cy.contains('Добавить в head').click()

    cy.get('form').next().children('div').as('list')
    checkCircleElement({ el: cy.get('@list').eq(0), value: TEXT, state: 'changing', type: 'head' })

    // eslint-disable-next-line
    cy.wait(DELAY)
    checkCircleElement({ el: cy.get('@list').eq(0), value: TEXT, state: 'modified' })

    // eslint-disable-next-line
    cy.wait(DELAY)
    checkCircleElement({ el: cy.get('@list').eq(0), value: TEXT, state: 'default' })
  })

  it('should add tail element correctly', () => {
    // eslint-disable-next-line
    cy.wait(DELAY)
    cy.get('form input[type="text"]').type(TEXT)
    cy.contains('Добавить в tail').click()

    cy.get('form').next().children('div').as('list')
    checkCircleElement({ el: cy.get('@list').last(), value: TEXT, state: 'changing', type: 'head' })

    // eslint-disable-next-line
    cy.wait(DELAY)
    checkCircleElement({ el: cy.get('@list').last(), value: TEXT, state: 'modified' })

    // eslint-disable-next-line
    cy.wait(DELAY)
    checkCircleElement({ el: cy.get('@list').last(), value: TEXT, state: 'default' })
  })

  it('should delete head element correctly', () => {
    // eslint-disable-next-line
    cy.wait(DELAY)
    let length = 0
    let value = ''
    cy.get('form').next().children('div').as('list')
    cy.get('@list').then($list => (length = $list.length))
    cy.get('@list').first().find('p[class*="letter"]')
      .then($el => {
        value = $el.text()
      })
      .then(() => {
        // eslint-disable-next-line
        cy.wait(DELAY)
        cy.contains('Удалить из head').click()

        checkCircleElement({ el: cy.get('@list').first(), value: value, state: 'changing', type: 'tail' })
        cy.get('@list').first().find('div[class*="circle_default"]').should('not.have.text', value)

        // eslint-disable-next-line
        cy.wait(DELAY)
        length <= 1 && cy.get('@list').should('have.length', 0)
        length > 1 && cy.get('@list').then($list => {
          expect($list.length).to.eq(length - 1)
        })
      })
      .end()
  })

  it('should delete tail element correctly', () => {
    // eslint-disable-next-line
    cy.wait(DELAY)
    let length = 0
    let value = ''
    cy.get('form').next().children('div').as('list')
    cy.get('@list').then($list => (length = $list.length))
    cy.get('@list').last().find('p[class*="letter"]')
      .then($el => {
        value = $el.text()
      })
      .then(() => {
        // eslint-disable-next-line
        cy.wait(DELAY)
        cy.contains('Удалить из tail').click()

        checkCircleElement({ el: cy.get('@list').last(), value: value, state: 'changing', type: 'tail' })
        cy.get('@list').last().find('div[class*="circle_default"]').should('not.have.text', value)

        // eslint-disable-next-line
        cy.wait(DELAY)
        length <= 1 && cy.get('@list').should('have.length', 0)
        length > 1 && cy.get('@list').then($list => {
          expect($list.length).to.eq(length - 1)
        })
      })
      .end()
  })

  it('should add element by index correctly', () => {
    // eslint-disable-next-line
    cy.wait(DELAY)
    cy.get('form').next().children('div').as('list')
    cy.get('form input[type="text"]').type(TEXT)
    cy.get('@list').then(($list) => {
      const length = $list.length
      const index = Math.floor(Math.random() * length)

      cy.get('form input[type="number"]').type(index)
      cy.contains('Добавить по индексу').click()

      // eslint-disable-next-line
      cy.wait(DELAY)
      for (let i = 0; i <= index; i++) {
        cy.get('@list').eq(i).find('div[class*="head"] div[class*="changing"]')
          .should('have.length', 1)
          .and('have.text', TEXT)
        i > 0 && cy.get('@list').eq(i - 1).find('div[class*="changing"]').should('have.length', 1)
        // eslint-disable-next-line
        cy.wait(DELAY)
      }

      cy.get('@list').eq(index).find('div[class*="modified"]')
        .should('have.length', 1)
        .and('have.text', TEXT)

      // eslint-disable-next-line
      cy.wait(DELAY)

      cy.get('@list').eq(index).find('div[class*="default"]')
        .should('have.length', 1)

      cy.get('@list').then(($newList) => {
        expect($newList.length).to.eq(length + 1)
      })
    })
      .end()
  })

  it('should delete element by index correctly', () => {
    // eslint-disable-next-line
    cy.wait(DELAY)
    cy.get('form').next().children('div').as('list')
    cy.get('@list').then(($list) => {
      const length = $list.length
      const index = Math.floor(Math.random() * length)
      const value = $list.eq(index).find('p[class*="letter"]').eq(0).text()

      cy.get('form input[type="number"]').type(index)
      cy.contains('Удалить по индексу').click()

      // eslint-disable-next-line
      cy.wait(DELAY)
      for (let i = 0; i < index; i++) {
        cy.get('@list').eq(i).find('div[class*="changing"]')
          .should('have.length', 1)

        // eslint-disable-next-line
        cy.wait(DELAY)
      }

      cy.get('@list').eq(index).find('div[class*="tail"] div[class*="changing"]')
        .should('have.length', 1)
        .and('have.text', value)
      cy.get('@list').eq(index).find('p[class*="letter"]').eq(0).should('not.have.text', value)

      // eslint-disable-next-line
      cy.wait(DELAY)
      length <= 1 && cy.get('@list').should('have.length', 0)
      length > 1 && cy.get('@list').then(($newList) => {
        expect($newList.length).to.eq(length - 1)
      })
    })
      .end()
  })
})
