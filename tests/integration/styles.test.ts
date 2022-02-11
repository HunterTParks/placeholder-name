import JSDom from 'jsdom-global'
import { mount } from '../../src/renderer'
import Component from '../../src/component'
import { createElement } from '../../src/lib/createElement'
import { assert } from 'chai'
import StylesRenderer from '../../src/stylesRenderer'
import stylesRenderer from '../../src/stylesRenderer'

describe('When adding styles', function () {
  before(function () {
    JSDom()
  })

  beforeEach(() => {
    document.body.innerHTML += `
    <body>
        <div id="app"></div>
    </body>
    `
  })

  afterEach(function () {
    document.body.innerHTML = ''
    stylesRenderer.clearStyles()
  })

  it('should generate a styles object when css is called', function () {
    mount(
      class extends Component {
        name = 'styles-component'
        styles = `
          .test {
            color: green;
          }
        `

        constructor(props) {
          super(props)
        }

        render(): HTMLElement {
          return createElement(
            'div',
            null,
            '<div class="test">This is supposed to be green</div>',
          )
        }
      },
      '#app',
    )

    const headStyles = document.head.getElementsByTagName('style')[0]
    const text = headStyles.sheet.cssRules[0].cssText

    assert.isOk(headStyles)
    assert.equal(text.includes('.test'), true)
    assert.equal(text.includes('color: green'), true)
  })
})
