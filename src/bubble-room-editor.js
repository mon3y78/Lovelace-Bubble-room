// /config/www/bubble-room/src/bubble-room-editor.js
import { LitElement, html, css } from 'https://unpkg.com/lit@2.6.1/index.js?module';

class BubbleRoomEditor extends LitElement {
  static get properties() {
    return {
      _config: { type: Object }
    };
  }

  /**
   * Imposta la configurazione iniziale.
   */
  setConfig(config) {
    this._config = config;
  }

  /**
   * Restituisce la configurazione attuale.
   */
  getConfig() {
    return this._config;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        padding: 10px;
      }
      h3 {
        margin-top: 0;
      }
      label {
        display: block;
        margin: 8px 0;
      }
      input, textarea {
        width: 100%;
        font-size: 14px;
        padding: 4px;
      }
      fieldset {
        border: 1px solid #ccc;
        margin: 10px 0;
        padding: 5px;
      }
      legend {
        font-weight: bold;
        padding: 0 5px;
      }
    `;
  }

  render() {
    if (!this._config) {
      return html`<div>Caricamento configurazione...</div>`;
    }
    return html`
      <div>
        <h3>Editor Visuale Bubble Room</h3>
        <!-- Campo per il nome -->
        <label>
          Nome:
          <input type="text" .value="${this._config.name || ''}" @input="${this._updateName}" />
        </label>
        <!-- Campo per l'icona -->
        <label>
          Icona:
          <input type="text" .value="${this._config.icon || ''}" @input="${this._updateIcon}" />
        </label>
        <fieldset>
          <legend>Entità</legend>
          <label>
            Presence:
            <input type="text" .value="${this._config.entities?.presence || ''}" @input="${this._updateEntity('presence')}" />
          </label>
          <label>
            Light:
            <input type="text" .value="${this._config.entities?.light || ''}" @input="${this._updateEntity('light')}" />
          </label>
          <label>
            Fan:
            <input type="text" .value="${this._config.entities?.fan || ''}" @input="${this._updateEntity('fan')}" />
          </label>
          <label>
            Media:
            <input type="text" .value="${this._config.entities?.media || ''}" @input="${this._updateEntity('media')}" />
          </label>
          <label>
            Vacuum:
            <input type="text" .value="${this._config.entities?.vacuum || ''}" @input="${this._updateEntity('vacuum')}" />
          </label>
          <label>
            Climate:
            <input type="text" .value="${this._config.entities?.climate || ''}" @input="${this._updateEntity('climate')}" />
          </label>
        </fieldset>
        <fieldset>
          <legend>Colori</legend>
          <label>
            Active:
            <input type="text" .value="${this._config.colors?.active || ''}" @input="${this._updateColor('active')}" />
          </label>
          <label>
            Inactive:
            <input type="text" .value="${this._config.colors?.inactive || ''}" @input="${this._updateColor('inactive')}" />
          </label>
          <label>
            Background Active:
            <input type="text" .value="${this._config.colors?.backgroundActive || ''}" @input="${this._updateColor('backgroundActive')}" />
          </label>
          <label>
            Background Inactive:
            <input type="text" .value="${this._config.colors?.backgroundInactive || ''}" @input="${this._updateColor('backgroundInactive')}" />
          </label>
        </fieldset>
        <fieldset>
          <legend>Mushrooms (formato JSON)</legend>
          <textarea rows="5" @input="${this._updateMushrooms}">
${JSON.stringify(this._config.mushrooms || [], null, 2)}</textarea>
        </fieldset>
        <p>
          Nota: Per configurazioni avanzate, modifica direttamente il YAML.
        </p>
      </div>
    `;
  }

  // Funzione per inviare l'evento "config-changed" con la configurazione aggiornata
  _fireConfigChanged() {
    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: { config: this._config },
        bubbles: true,
        composed: true,
      })
    );
  }

  _updateName(ev) {
    const newName = ev.target.value;
    this._config = { ...this._config, name: newName };
    this.requestUpdate();
    this._fireConfigChanged();
  }

  _updateIcon(ev) {
    const newIcon = ev.target.value;
    this._config = { ...this._config, icon: newIcon };
    this.requestUpdate();
    this._fireConfigChanged();
  }

  _updateEntity(entityKey) {
    return (ev) => {
      const newValue = ev.target.value;
      const entities = { ...this._config.entities, [entityKey]: newValue };
      this._config = { ...this._config, entities };
      this.requestUpdate();
      this._fireConfigChanged();
    };
  }

  _updateColor(colorKey) {
    return (ev) => {
      const newValue = ev.target.value;
      const colors = { ...this._config.colors, [colorKey]: newValue };
      this._config = { ...this._config, colors };
      this.requestUpdate();
      this._fireConfigChanged();
    };
  }

  _updateMushrooms(ev) {
    let newMushrooms;
    try {
      newMushrooms = JSON.parse(ev.target.value);
    } catch (e) {
      newMushrooms = this._config.mushrooms || [];
    }
    this._config = { ...this._config, mushrooms: newMushrooms };
    this.requestUpdate();
    this._fireConfigChanged();
  }
}

customElements.define('bubble-room-editor', BubbleRoomEditor);
