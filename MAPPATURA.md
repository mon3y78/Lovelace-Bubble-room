# MAPPATURA del codice

Questo file contiene la mappatura degli elementi principali di `src/bubble-room.js` e `src/bubble-room-editor.js`.

| Nome elemento            | File di origine              | Tipo       | Scopo                                                       | Dipendenze                        |
|--------------------------|------------------------------|------------|-------------------------------------------------------------|-----------------------------------|
| `DEVICE_CLASS_ICON_MAP`  | `src/bubble-room.js`         | const      | Mappa icone per device_class (stato on/off)                 | nessuna                           |
| `DOMAIN_ICON_MAP`        | `src/bubble-room.js`         | const      | Mappa icone per domain                                       | nessuna                           |
| `SENSOR_TYPE_MAP`        | `src/bubble-room.js`         | const      | Mappa icone per sensori specifici                            | nessuna                           |
| `defaultAction`          | `src/bubble-room.js`         | const      | Azione di default per tap e hold sui bubble                  | nessuna                           |
| `defaultIcons`           | `src/bubble-room.js`         | const      | Icone di default per sub-button, entities e presenza         | nessuna                           |
| `BubbleRoom`             | `src/bubble-room.js`         | classe     | Componente principale che estende LitElement per la room      | LitElement, costanti              |
| `firstUpdated()`         | `BubbleRoom` (metodo)        | method     | Ciclo di vita LitElement eseguito al primo render            | nessuna                           |
| `shouldUpdate()`         | `BubbleRoom` (metodo)        | method     | Controllo personalizzato di aggiornamento del componente     | proprietà reactive                |
| `render()`               | `BubbleRoom` (metodo)        | method     | Genera il template HTML per il componente                   | helper interni                    |
| `_getMainIconSize()`     | `BubbleRoom` (metodo)        | private    | Calcola la dimensione dell’icona principale                 | config, costanti                  |
| `_getSubButtonIconSize()`| `BubbleRoom` (metodo)        | private    | Calcola la dimensione delle icone dei sub-button            | costanti                          |
| `_getMushroomIconSize()` | `BubbleRoom` (metodo)        | private    | Calcola la dimensione delle icone per entità secondarie     | costanti                          |
| `BubbleRoomEditor`       | `src/bubble-room-editor.js`  | classe     | Componente editor esteso da LitElement per la UI di editing | LitElement, costanti, BubbleRoom  |
| `connectedCallback()`    | `BubbleRoomEditor` (metodo)  | method     | Inizializza stato e listener all’attacco del componente     | super.connectedCallback           |
| `render()`               | `BubbleRoomEditor` (metodo)  | method     | Genera UI di editing con pannelli e form                    | helper interni                    |
| `updated()`              | `BubbleRoomEditor` (metodo)  | method     | Gestisce il re-rendering alla modifica delle proprietà      | proprietà reactive                |

> **Istruzioni:**
> 1. Compila le righe vuote con i nomi di costanti, funzioni, classi e metodi.
> 2. Specifica per ciascun elemento il file di origine, il tipo, il breve scopo e le dipendenze.
> 3. Aggiungi nuove righe per ogni elemento rilevante.
