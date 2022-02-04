abstract class Component {
  state?: any
  props: Record<string, any>
  children: Record<string, Component> = {}
  directMarkup?: HTMLElement
  private parent?: HTMLElement | Component
  abstract name?: string
  abstract render(): HTMLElement

  constructor(props: Record<string, any>) {
    this.props = props
  }

  setState(newState: any): void {
    if (this.state == newState) {
      return
    }

    this.state = newState
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
    return this.directMarkup
  }

  /**
   * Takes the name of the Component and turns it into a formatted string used to create custom elements
   * @returns Correctly formatted string for creating custom HTML elements (i.e. turn 'NewDiv' -> 'new-div')
   */
  private adjustClassName(): string {
    if (this.name) {
      return this.name
        .replace(/[A-Z][a-z]*/g, (str) => '-' + str.toLowerCase() + '-')
        .replace('--', '-')
        .replace(/(^-)|(-$)/g, '')
    }

    return ''
  }
}

export default Component
