import { html, LitElement, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('about-page')
export class AboutPageComponent extends LitElement {
  render() {
    return html`
      <div>
        <h1>About</h1>
        <a href="/">Main</a>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'about-page': AboutPageComponent;
  }
}
