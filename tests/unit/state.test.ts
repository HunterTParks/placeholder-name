import Renderer from '../../src/renderer'
import Component from '../../src/component'
import { createElement } from '../../src/lib/createElement'
import { assert } from 'chai'
import JSDom from 'jsdom-global'

describe('When managing state', function () {
  let renderer: Renderer
  let markup: HTMLSpanElement
  let container: HTMLDivElement

  before(function () {
    JSDom()

    container = document.createElement('div')
    container.id = 'app'
    document.body.appendChild(container)

    renderer = new Renderer()
  })

  it('should be able to add state in the constructor', function () {
    const props: Record<string, any> = {
      hello: 'world!',
    }

    // Render component to DOM
    renderer.mount(
      class extends Component {
        name = 'statetest'

        constructor(props) {
          super(props)
          this.state = {
            hello: this.props.hello,
          }
        }

        render(): HTMLElement {
          return createElement(this.name, null, `Hello - ${this.state.hello}`)
        }
      },
      '#app',
      {
        props,
      },
    )

    // Get elements from DOM
    const element: HTMLElement = document.querySelector('statetest')

    // Is it in the DOM?
    assert.isOk(element)
    assert.equal(element.innerHTML, 'Hello - world!')
  })

  it('should change state using setState', function () {
    const props: Record<string, any> = {
      hello: 'world!',
    }

    // Render component to DOM
    renderer.mount(
      class extends Component {
        name = 'setstatetest'

        constructor(props) {
          super(props)
          this.state = {
            hello: this.props.hello,
          }
        }

        render(): HTMLElement {
          return createElement(this.name, null, `Hello - ${this.state.hello}`)
        }
      },
      '#app',
      {
        props,
      },
    )

    // Get elements from DOM
    const element: HTMLElement = document.querySelector('setstatetest')

    // Is it in the DOM?
    assert.isOk(element)
    assert.equal(element.innerHTML, 'Hello - world!')
  })
})
