# Bubble Room Card
Bubble Room Card è una Lovelace card per Home Assistant basata sui solidi principi della Bubble Card e sulla versatilità dei Mushroom Templates. Progettata per offrire una visione d'insieme della stanza, questa card consente di monitorare e gestire in maniera centralizzata tutti i dispositivi e le entità con un'interfaccia moderna, intuitiva e altamente personalizzabile.

# Caratteristiche principali
# Visione d'insieme della stanza:
Visualizza il nome della stanza, un'icona principale che rileva la presenza nella stanza, mostra la temperatura attuale e offre la possibilità di attivare una finestra popup dedicata (basata su Bubble Card) per ulteriori controlli specifici.

# Entità della stanza:
Permette di personalizzare fino a 5 entità a piacimento (ad esempio, luci, sensori, etc.) e include una sesta entità dedicata al termostato, offrendo un controllo completo e centralizzato della stanza.

# Personalizzazione completa:
La card consente di personalizzare i colori e le funzionalità dei tasti, permettendoti di definire le tonalità per gli stati attivi e inattivi, nonché di configurare le azioni tap e hold per ogni elemento. Questa flessibilità ti permette di integrare perfettamente la card nel tema del tuo Home Assistant e di adattarla alle specifiche esigenze della tua smart home.

# Basata su Bubble Card e Mushroom Templates:
Grazie all'approccio ibrido, la Bubble Room Card combina il design accattivante della Bubble Card con la flessibilità dei Mushroom Templates, offrendo un'interfaccia utente interattiva e personalizzabile.

## Installazione

### Tramite HACS
1. Vai in HACS > Frontend.
2. Clicca su "Explore & Add Repositories" e aggiungi il repository GitHub di **Bubble Room**.
3. Installa la card e aggiungi la seguente risorsa in Lovelace:
   ```yaml
   url: /hacsfiles/bubble-room/src/bubble-room.js
   type: module

