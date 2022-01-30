import Component from '../component'

export function createElement(
  elementOrComponent: string | (new () => Component),
  props: Array<Component | Function | Record<string, any>>,
  markup: string,
): HTMLElement {
  let elementType: string

  // If a component is passed in, instantiate it
  // If not, it's a string and an element can be created
  if (elementOrComponent && typeof elementOrComponent !== 'string') {
    const component = new elementOrComponent()

    if (!component.name) {
      throw Error('Cannot instantiate a component that does not have a name')
    }

    elementType = component.name
  } else {
    elementType = elementOrComponent
  }

  const element = document.createElement(elementType)
  element.innerHTML += markup
  return element
}
