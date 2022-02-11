import Component from '../component'
import { isElement } from './utils'

enum HTMLMarkdownTypes {
  'div',
  'span',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'p',
}

export function createElement(
  elementOrComponent: (new (props: Record<string, any>) => Component) | string,
  props: Record<string, any>,
  markup: string | Array<HTMLElement | string>,
): HTMLElement {
  let elementType: string,
    component: Component,
    finalMarkup: string = ''

  // If a component is passed in, instantiate it
  // If not, it's a string and an element can be created
  if (elementOrComponent && typeof elementOrComponent !== 'string') {
    component = new elementOrComponent(props)

    if (!component.name) {
      throw Error('Cannot instantiate a component that does not have a name')
    }

    elementType = component.name
    finalMarkup += component.runRender().outerHTML
  } else {
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

    finalMarkup += isElement(newMarkup)
      ? (newMarkup as HTMLElement).innerHTML
      : newMarkup
  }

  const element = document.createElement(elementType)
  element.innerHTML += finalMarkup
  return element
}
