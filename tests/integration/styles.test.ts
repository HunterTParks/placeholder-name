import JSDom from 'jsdom-global'
import { mount } from '../../src/renderer'
import Component from '../../src/component'
import { createElement } from '../../src/lib/createElement'
import { assert } from 'chai'
import StylesRenderer from '../../src/stylesRenderer'

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
    document.head.getElementsByTagName('style')[0].remove()
    StylesRenderer.clearStyles()
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
    assert.isTrue(text.includes('.test'))
    assert.isTrue(text.includes('color: green'))
  })

  it('Should be able to add more than one CSS rule at a time', function () {
    mount(
      class extends Component {
        name = 'multiplecssrulecomponent'
        styles = [
          `
          .blue {
            color: blue;
          }
        `,
          `
        .green {
          color: green;
        }
        `,
        ]

        render(): HTMLElement {
          return createElement('div', null, [
            createElement(
              'div',
              null,
              '<div class="blue">This is supposed to be blue</div>',
            ),
            createElement(
              'div',
              null,
              '<div class="green">This is supposed to be green</div>',
            ),
          ])
        }
      },
      '#app',
    )

    const headStyles = document.head.getElementsByTagName('style')[0]
    const cssRules = headStyles.sheet.cssRules

    assert.isOk(headStyles)

    let greenRule: CSSRule | undefined, blueRule: CSSRule | undefined
    for (const rule of cssRules) {
      if (rule.cssText.includes('.green')) {
        greenRule = rule
      } else if (rule.cssText.includes('.blue')) {
        blueRule = rule
      }
    }

    // Checking for Green
    assert.isOk(greenRule)
    assert.isTrue(greenRule.cssText.includes('green'))

    assert.isOk(blueRule)
    assert.isTrue(blueRule.cssText.includes('blue'))
  })
})
