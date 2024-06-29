import { html, LitElement, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './additional-component';

@customElement('extra-component')
export class ExtraComponent extends LitElement {
  @property({ type: Number }) count = 0;

  render() {
    return html`
      <div>
        hello, world
        <p>is extra</p>
        <slot name="children"></slot>
        <additional-component />
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
    'extra-component': ExtraComponent;
  }
}
