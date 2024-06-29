import { html, LitElement, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('client-component')
export class ClientComponent extends LitElement {
  @property({ type: Number }) count = 0;

  render() {
    return html`
      <div>
        hello, world
        <p>is extra</p>
        hello, world2
        <slot name="children"></slot>
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
    'client-component': ClientComponent;
  }
}
