import Component from './component'
import { isElement } from './lib/utils'
import StylesRenderer from './stylesRenderer'

interface MountConfig {
  props?: Record<string, any>
}

class Renderer {
  stylesGenerator: () => void

  constructor(stylesGenerator: () => void) {
    this.stylesGenerator = stylesGenerator
  }

  mount(
    container: (new (props: Record<string, any>) => Component) | HTMLElement,
    selector: string,
    config?: MountConfig,
  ) {
    let component: Component | undefined

    if (!container) {
      throw new Error(
        'Error mounting container - the container passed in was invalid or does not exist',
      )
    }

    if (!selector) {
      throw new Error(
        'Error mounting container - the selector passed in was invalid',
      )
    }

    const found_container: HTMLElement | null = document.querySelector(selector)
    if (!found_container) {
      throw new Error(
        'Error mounting container - the selector passed in was valid but it would not find an element with the selector specified',
      )
    }

    const markup: HTMLElement = isElement(container)
      ? (container as HTMLElement)
      : (() => {
          // Really dumb looking but instantiate a new component and pass in props
          component = new (container as new (
            props: Record<string, any>,
          ) => Component)(config?.props || {})

          return component.runRender()
        })()

    StylesRenderer.generate()

    if (found_container) {
      found_container.appendChild(markup)
      component?.setParent(found_container)
    }
  }

  mountAsync(
    container: (new (props: Record<string, any>) => Component) | HTMLElement,
    selector: string,
    config?: MountConfig,
  ) {
    return new Promise<void>((resolve, reject) => {
      let component: Component | undefined

      if (!container) {
        reject(
          'Error mounting container - the container passed in was invalid or does not exist',
        )
      }

      if (!selector) {
        reject('Error mounting container - the selector passed in was invalid')
      }

      const found_container: HTMLElement | null = document.querySelector(
        selector,
      )
      if (!found_container) {
        reject(
          'Error mounting container - the selector passed in was valid but it would not find an element with the selector specified',
        )
      }

      const markup: HTMLElement = isElement(container)
        ? (container as HTMLElement)
        : (() => {
            // Really dumb looking but instantiate a new component and pass in props
            component = new (container as new (
              props: Record<string, any>,
            ) => Component)(config?.props || {})

            return component.runRender()
          })()

      if (found_container) {
        found_container.appendChild(markup)
        component?.setParent(found_container)
        resolve()
      }
    })
  }
}

const mount = new Renderer(StylesRenderer.generate).mount
export default Renderer
export { mount }
