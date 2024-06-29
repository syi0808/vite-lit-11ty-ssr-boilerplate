import { html, LitElement, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../components/extra-component';
import '../components/client-component.nossr';

@customElement('home-page')
export class HomePageComponent extends LitElement {
  render() {
    return html`
      <div>
        <h1>Home</h1>
        <p>Home page content</p>
        <p>The red border means the component is not hydrated. Hover it so it can hydrate</p>
        <a href="/about">About</a>
        <extra-component />
        <client-component />
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
    'home-page': HomePageComponent;
  }
}
