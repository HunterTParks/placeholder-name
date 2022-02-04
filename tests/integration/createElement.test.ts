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
    container = document.createElement('div')
    container.id = 'app'
    document.body.appendChild(container)

    // Initialize Renderer
    renderer = new Renderer()
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

    assert.isOk(goodbyeElement)
    assert.isOk(helloElement)
  })
})
