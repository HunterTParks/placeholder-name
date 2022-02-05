import Component from './component'
import { isElement } from './lib/utils'

interface MountConfig {
  props?: Record<string, any>
}

class Renderer {
  mount(
    container: (new (props: Record<string, any>) => Component) | HTMLElement,
    selector: string,
    config?: MountConfig,
  ) {
    if (!container) {
      throw new Error(
        'Error mounting container - the container passed in was invalid or does not exist',
      )
    }

    if (!selector) {
      throw new Error(
        'Error mounting container - the selector passed in was invalid',
      )
      return
    }

    const found_container = document.querySelector(selector),
      markup: HTMLElement = isElement(container)
        ? (container as HTMLElement)
        : new (container as new (props: Record<string, any>) => Component)(
            config?.props || {},
          ).render()

    if (found_container) {
      found_container.appendChild(markup)
    }
  }
}

export default Renderer
