import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('wc-example')
export class WCExample extends LitElement {
  
  @property({ type: String })
  title = 'This is a title';

  render() {
    return html`
      <h1>${this.title}</h1>
    `
  }

  static styles = css`
    :host {
      display: block;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-example': WCExample
  }
}
