// Shamefully stolen from Stack Overflow:
// https://stackoverflow.com/a/384380
export function isElement(o: any) {
  return typeof HTMLElement === 'object'
    ? o instanceof HTMLElement //DOM2
    : o &&
        typeof o === 'object' &&
        o !== null &&
        o.nodeType === 1 &&
        typeof o.nodeName === 'string'
}
