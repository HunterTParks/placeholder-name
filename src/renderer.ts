class Renderer {
  container: any
  selector: any

  constructor(container: any) {
    this.container = container
  }

  mount(selector: string) {
    if (!selector) {
      throw new Error(
        'Error mounting container - the selector passed in was invalid',
      )
      return
    }

    this.selector = selector

    const found_container = document.querySelector(this.selector)

    if (found_container) {
      found_container.appendChild(this.container)
    }
  }
}

export default Renderer
