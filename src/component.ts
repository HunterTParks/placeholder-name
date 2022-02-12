import StylesRenderer from './stylesRenderer'

abstract class Component {
  state?: Record<string, any>
  props: Record<string, any>
  children: Record<string, Component> = {}
  directMarkup?: HTMLElement
  styles?: string | Array<string>
  private parent?: HTMLElement | Component
  abstract name?: string
  abstract render(): HTMLElement
  protected wasMounted?(): void

  constructor(props: Record<string, any>) {
    this.props = props
  }

  setState(newState: any): void {
    if (this.state == newState) {
      return
    }

    this.state = newState

    if (this.parent && this.parent instanceof Component) {
      ;(this.parent as Component).directMarkup?.replaceChild(
        this.directMarkup as HTMLElement,
        this.runRender(),
      )
    } else if (this.parent && this.parent instanceof HTMLElement) {
      const parent: HTMLElement = this.parent as HTMLElement
      const child: HTMLElement = parent.querySelector(
        (this.directMarkup as HTMLElement).tagName,
      ) as HTMLElement

      parent.replaceChild(this.runRender(), child)
    }
  }

  setParent(parent: HTMLElement | Component) {
    if (parent) {
      this.parent = parent
    }
  }

  setChildren(components: Component | Array<Component>) {
    if (!Array.isArray(components)) components = [components]

    for (const component of components) {
      if (component.name) {
        component.setParent(this)

        this.children[component.name] = component
      }
    }
  }

  runRender(): HTMLElement {
    this.directMarkup = this.render()

    if (this.styles) {
      StylesRenderer.addStyles(this.styles)
    }

    if (this.wasMounted) {
      this.wasMounted()
    }

    return this.directMarkup
  }
}

export default Component
