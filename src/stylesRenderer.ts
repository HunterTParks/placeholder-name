class StyleRenderer {
  styles: Array<string>

  constructor() {
    this.styles = []
  }

  addStyles(styles: string | Array<string>): void {
    if (!Array.isArray(styles)) {
      styles = [styles]
    }

    this.styles.push(...styles)
  }

  clearStyles(): void {
    this.styles = []
  }

  generate(): void {
    //   If there are no styles to generate, then skip the generation step
    if (!this.styles.length) {
      return
    }

    const stylesEle: HTMLStyleElement = document.createElement('style')
    document.head.appendChild(stylesEle)

    for (const style of this.styles) {
      stylesEle.sheet?.insertRule(style)
    }
  }
}

export default new StyleRenderer()
