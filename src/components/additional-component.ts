import { html, LitElement, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('additional-component')
export class AdditionalComponent extends LitElement {
  @property({ type: Number }) count = 0;

  render() {
    return html`
      <div>
        hello, world
        <p>is extra</p>
        <slot name="children"></slot>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }

    :fullscreen {
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'additional-component': AdditionalComponent;
  }
}
