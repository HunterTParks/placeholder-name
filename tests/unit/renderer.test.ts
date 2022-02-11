import Renderer from '../../src/renderer'
import { assert } from 'chai'
import JSDom from 'jsdom-global'

describe('When creating a new Renderer', function () {
  let renderer: Renderer
  let markup: HTMLSpanElement

  before(function () {
    JSDom()

    markup = document.createElement('span')
    markup.innerText = 'Hello world!'
    renderer = new Renderer(() => {})
  })

  it('should be able to append the correct markup (without a Component) to the DOM Tree', function () {
    // Render Container and Mount Component to it
    const container = document.createElement('div')
    container.id = 'app'
    document.body.appendChild(container)
    renderer.mount(markup, '#app')

    // Get Element that was just mounted
    const element = document.getElementsByTagName('span')[0]

    // See if it was appended to DOM
    assert.equal(element.innerText, 'Hello world!')
  })

  it('should throw an error when a container is not passed on mount', function () {
    assert.throws(
      () => renderer.mount(markup, ''),
      Error,
      'Error mounting container - the selector passed in was invalid',
    )
  })
})
