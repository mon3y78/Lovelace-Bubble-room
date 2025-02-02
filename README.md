# Bubble Room

Bubble Room è una custom card per Home Assistant che visualizza una "bubble" centrale con sub-buttons e un overlay di elementi ispirati ai mushroom-template.  
Gli utenti possono personalizzare:
- Le entità principali (presenza, luce, ventilatore, media player, aspirapolvere, climate)
- I colori per stato attivo/inattivo
- Un array di elementi "mushroom" (con icone, posizionamenti assoluti e azioni)

## Installazione

### Tramite HACS
1. Vai in HACS > Frontend.
2. Clicca su "Explore & Add Repositories" e aggiungi il repository GitHub di **Bubble Room**.
3. Installa la card e aggiungi la seguente risorsa in Lovelace:
   ```yaml
   url: /hacsfiles/bubble-room/src/bubble-room.js
   type: module

