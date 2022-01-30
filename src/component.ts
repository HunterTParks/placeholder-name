abstract class Component {
  state?: any
  abstract name?: string

  abstract render(): HTMLElement

  setState(newState: any): void {
    if (this.state == newState) {
      return
    }

    this.state = newState
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
