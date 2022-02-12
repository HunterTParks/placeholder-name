import Component from '../component'
import { isElement } from './utils'

export function createElement(
  elementOrComponent: (new (props: Record<string, any>) => Component) | string,
  props: Record<string, any>,
  markup: string | Array<HTMLElement | string>,
): HTMLElement {
  let elementType: string, component: Component, finalMarkup: HTMLElement

  // If a component is passed in, instantiate it
  // If not, it's a string and an element can be created
  if (elementOrComponent && typeof elementOrComponent !== 'string') {
    component = new elementOrComponent(props)

    if (!component.name) {
      throw Error('Cannot instantiate a component that does not have a name')
    }

    elementType = component.name
    finalMarkup = document.createElement(elementType)
    finalMarkup.outerHTML += component.runRender().outerHTML
  } else {
    finalMarkup = document.createElement(elementOrComponent)
    elementType = elementOrComponent
  }

  if (!Array.isArray(markup)) {
    markup = [markup]
  }

  for (const newMarkup of markup) {
    // We don't want to append any null values
    if (!newMarkup) {
      continue
    }

    if (isElement(newMarkup)) {
      finalMarkup.appendChild(newMarkup as HTMLElement)
    } else {
      finalMarkup.insertAdjacentHTML('beforeend', newMarkup as string)
    }
  }

  return finalMarkup
}
