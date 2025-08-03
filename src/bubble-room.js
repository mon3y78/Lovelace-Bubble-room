import { LitElement, html, css } from 'lit';

export class BubbleRoom extends LitElement {
  static styles = css`
    /* Il tuo custom element deve riempire tutta la card */
    :host {
      display: block;
      height: 100%;
      box-sizing: border-box;
    }

    /* Griglia principale: 2fr + 1fr, altezza 100% */
    .bubble-room-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      grid-template-rows: 1fr;    /* unica riga che occupa tutta l’altezza */
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      border: 2px dashed yellow;  /* cornice debug griglia */
    }

    /* Colonna sinistra (main-area) */
    .main-area {
      display: flex;
      flex-direction: column;
      height: 100%;               /* riempie tutta la riga */
      min-height: 0;              /* permette di ridursi */
      box-sizing: border-box;
      border: 2px dashed green;   /* cornice debug main-area */
    }

    /* Area per icona + funghi */
    .icon-mushroom-area {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      border: 2px dashed violet;  /* cornice debug icon-mushroom-area */
    }

    /* Colonna destra (sidebar) */
    .sidebar {
      display: flex;
      flex-direction: column;
      height: 100%;               /* riempie tutta la riga */
      min-height: 0;              /* permette di ridursi */
      box-sizing: border-box;
      border: 2px dashed red;     /* cornice debug sidebar */
    }
  `;
  
  render() {
    return html`
      <div class="bubble-room-grid">
        <!-- Colonna sinistra -->
        <div class="main-area">
          <!-- Al suo interno, eventualmente sensori/nome -->
          <!-- Poi l’area icon-mushroom -->
          <div class="icon-mushroom-area"></div>
        </div>

        <!-- Colonna destra: sub-button, ecc. -->
        <div class="sidebar"></div>
      </div>
    `;
  }
}

customElements.define('bubble-room', BubbleRoom);