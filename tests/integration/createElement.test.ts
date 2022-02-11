import Renderer from '../../src/renderer'
import Component from '../../src/component'
import { createElement } from '../../src/lib/createElement'
import { assert } from 'chai'
import JSDom from 'jsdom-global'

class HelloWorld extends Component {
  name = 'helloworld'

  render(): HTMLElement {
    return createElement(this.name, null, `Hello World!`)
  }
}

describe('When creating a single new element', function () {
  let renderer: Renderer
  let container: HTMLDivElement

  before(function () {
    // Initialize DOM and add app container to body
    JSDom()

    // Initialize Renderer
    renderer = new Renderer(() => {})
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

  it('Should have the appropriate markup in the DOM tree', function () {
    // Mount component to Container
    renderer.mount(HelloWorld, '#app')

    // Get Element that was mounted
    const element = document.querySelector('#app > helloworld')

    // See if it was appended to DOM
    assert.equal(element.innerHTML, 'Hello World!')
  })

  it('Should render all children objects', function () {
    renderer.mount(
      class extends Component {
        name = 'goodbyeworld'

        render(): HTMLElement {
          return createElement(this.name, null, [
            createElement(HelloWorld, null, null),
            '<div id="beginning-div">Hello from beginning-div</div>',
            '<div id="ending-div">Hello from ending-div</div>',
          ])
        }
      },
      '#app',
    )

    // Get Elements from DOM
    const goodbyeElement = document.querySelector('#app > goodbyeworld')
    const helloElement = document.querySelector(
      '#app > goodbyeworld > helloworld',
    )
    const beginningDiv = document.querySelector('#app #beginning-div')
    const endingDiv = document.querySelector('#app #ending-div')

    assert.isOk(goodbyeElement)
    assert.isOk(helloElement)
    assert.isOk(beginningDiv)
    assert.isOk(endingDiv)
  })

  // Is this test necessary?
  it("Should add props to it's private properties", function () {
    const props: Record<string, any> = {
      hello: 'world!',
    }

    renderer.mount(
      class extends Component {
        name = 'helloworldprops'

        constructor(props) {
          super(props)
        }

        render(): HTMLElement {
          return createElement(this.name, props, `Hello - ${this.props.hello}`)
        }
      },
      '#app',
      {
        props,
      },
    )

    const propsElement: HTMLElement = document.querySelector(
      '#app > helloworldprops',
    )

    assert.isOk(propsElement)
    assert.equal(propsElement.innerHTML, 'Hello - world!')
  })
})
