import JSDom from 'jsdom-global'
import { mount } from '../../src/renderer'
import Component from '../../src/component'
import { createElement } from '../../src/lib/createElement'
import { assert } from 'chai'

describe('When managing state', function () {
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
  })

  it('should be able to add state in the constructor', function () {
    // Render component to DOM
    const props: Record<string, any> = {
      hello: 'world!',
    }

    mount(
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

  it('should change state using setState', async function () {
    const props: Record<string, any> = {
      hello: 'world!',
    }

    // Render component to DOM
    mount(
      class extends Component {
        name = 'setstatetest'

        constructor(props) {
          super(props)
          this.setState({
            hello: this.props.hello,
          })
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

  it('should render the component again when state is changed', function () {
    const props: Record<string, any> = {
      hello: 'Hello World!',
    }

    mount(
      class extends Component {
        name = 'changestatetest'
        button: HTMLButtonElement

        constructor(props) {
          super(props)
          this.state = {
            msg: this.props.hello,
          }

          this.button = document.createElement('button')
          this.button.id = 'set-state-button'
          this.button.innerText += 'Click me'
          this.button.onclick = () =>
            this.setState({
              msg: 'Goodbye World!',
            })

          document.querySelector('#app').appendChild(this.button)
        }

        render(): HTMLElement {
          return createElement(this.name, null, `${this.state.msg}`)
        }
      },
      '#app',
      {
        props,
      },
    )

    const button = document.querySelector(
      '#app #set-state-button',
    ) as HTMLElement
    button.click()

    const msg = document.querySelector('#app changestatetest')

    assert.isOk(msg)
    assert.equal(msg.innerHTML, 'Goodbye World!')
  })
})
