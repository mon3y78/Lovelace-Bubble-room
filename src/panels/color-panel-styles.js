// src/panels/color-panel-styles.js
// Stili CSS per ColorPanel, estratti per tenere il componente principale conciso.
import { css } from 'lit';

export const colorPanelStyles = css`
  :host { display:block; }
  .glass-panel {
    margin: 0 !important;
    width: 100%;
    box-sizing: border-box;
    border-radius: 40px;
    position: relative;
    background: var(--glass-bg, rgba(95,255,235,0.26));
    box-shadow: var(--glass-shadow, 0 2px 24px rgba(95,255,235,0.13));
    overflow: hidden;
  }
  .glass-panel::after {
    content: '';
    position: absolute; inset: 0;
    border-radius: inherit;
    background: var(--glass-sheen,
      linear-gradient(120deg, rgba(255,255,255,0.14),
      rgba(255,255,255,0.08) 70%, transparent 100%));
    pointer-events: none;
  }
  .glass-header {
    padding: 22px 0;
    text-align: center;
    font-size: 1.11rem;
    font-weight: 700;
    color: #fff;
  }

  /* Grid delle card preset */
  .preset-bar {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 12px;
    padding: 8px 16px 2px 16px;
    box-sizing: border-box;
  }
  .style-section {
    padding: 0 16px 12px 16px;
    box-sizing: border-box;
  }
  .style-heading {
    font-size: 1.05rem;
    font-weight: 700;
    color: #e9f8ff;
    text-align: center;
    margin: 4px 0 10px 0;
  }
  .style-bar {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 12px;
  }
  .style-card {
    position: relative;
    border-radius: 14px;
    border: 1px solid rgba(255,255,255,0.14);
    background: rgba(24,32,40,0.45);
    padding: 14px 16px;
    cursor: pointer;
    user-select: none;
    transition: transform .12s ease, box-shadow .12s ease, border-color .12s ease;
    outline: none;
    display: flex;
    flex-direction: column;
    gap: 6px;
    text-align: center;
    min-height: 98px;
  }
  .style-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.25);
    border-color: rgba(255,255,255,0.28);
  }
  .style-card.selected {
    border-color: #73f6e5;
    box-shadow: 0 0 0 2px inset rgba(115,246,229,0.35);
  }
  .style-card:focus-visible {
    box-shadow: 0 0 0 3px rgba(115,246,229,0.55);
  }
  .style-name {
    font-weight: 800;
    font-size: 1.0rem;
    color: #e9f8ff;
  }
  .style-desc {
    font-size: 0.88rem;
    color: rgba(233,248,255,0.75);
    line-height: 1.35;
  }
  .preset-card {
    position: relative;
    border-radius: 14px;
    border: 1px solid rgba(255,255,255,0.14);
    background: rgba(24,32,40,0.45);
    padding: 12px 12px 10px;
    cursor: pointer;
    user-select: none;
    transition: transform .12s ease, box-shadow .12s ease, border-color .12s ease;
    outline: none;
    display: grid;
    grid-template-rows: auto auto;
    gap: 8px;
  }
  .preset-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.25);
    border-color: rgba(255,255,255,0.28);
  }
  .preset-card.selected {
    border-color: #73f6e5;
    box-shadow: 0 0 0 2px inset rgba(115,246,229,0.35);
  }
  .preset-name {
    order: 1;
    font-weight: 800;
    color: #e9f8ff;
    font-size: .95rem;
    text-align: center;
    margin-bottom: 2px;
  }

  .swatches {
    order: 2;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
  .swatch {
    border-radius: 10px;
    padding: 8px 6px;
    border: 1px solid rgba(255,255,255,0.10);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    flex-direction: column;
  }
  .dot {
    width: 16px; height: 16px; border-radius: 50%;
    border: 2px solid rgba(255,255,255,0.75);
    flex: 0 0 auto;
  }
  .swatch-label {
    color: #f0f6ff;
    font-size: .8rem;
    opacity: .95;
    line-height: 1;
  }
  /* ── sezioni colore (stile allineato a preset-card / style-card) ── */
  .mini-pill {
    background: rgba(24,32,40,0.45);
    border: 1px solid rgba(255,255,255,0.14);
    border-radius: 14px;
    margin: 6px 16px;
    overflow: hidden;
    transition: border-color 0.18s, box-shadow 0.18s;
  }
  .mini-pill:hover {
    border-color: rgba(255,255,255,0.28);
    box-shadow: 0 6px 20px rgba(0,0,0,0.25);
  }
  .mini-pill.expanded {
    border-color: rgba(255,255,255,0.22);
    box-shadow: 0 4px 18px rgba(0,0,0,0.22);
  }
  .mini-pill-header {
    display: flex;
    align-items: center;
    padding: 14px 18px;
    font-weight: 800;
    font-size: 0.97rem;
    color: var(--section-accent, #73f6e5);
    cursor: pointer;
    user-select: none;
    border-radius: 14px;
    transition: background 0.14s;
  }
  .mini-pill-header:hover {
    background: rgba(255,255,255,0.04);
  }
  .mini-pill-header .chevron {
    margin-left: auto;
    font-size: 0.85em;
    opacity: 0.7;
    transition: transform 0.18s;
  }
  .mini-pill.expanded .mini-pill-header .chevron {
    transform: rotate(90deg);
  }
  .mini-pill-content {
    padding: 4px 14px 14px;
    animation: pill-expand 0.22s cubic-bezier(.5,1.2,.6,1) both;
  }
  @keyframes pill-expand {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── campi colore interni ── */
  .input-group {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.10);
    border-radius: 10px;
    margin-bottom: 8px;
    padding: 12px 14px 10px;
  }
  .input-group label {
    display: block;
    font-size: 0.92rem;
    font-weight: 700;
    color: var(--section-accent, #73f6e5);
    margin-bottom: 8px;
  }
  input[type="color"] {
    width: 48px; height: 28px;
    border: 1.5px solid rgba(255,255,255,0.25);
    border-radius: 7px;
    cursor: pointer;
    vertical-align: middle;
  }
  input[type="range"] {
    width: 100%;
    margin: 6px 0 4px;
  }
  input[type="text"] {
    width: 100%;
    box-sizing: border-box;
    border: 1px solid rgba(255,255,255,0.14);
    border-radius: 8px;
    padding: 7px 10px;
    background: rgba(0,0,0,0.30);
    color: #e9f8ff;
    font-size: 0.88rem;
    margin-top: 2px;
  }

  /* ── toggle switch ── */
  .toggle-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px 0 10px;
  }
  .toggle-label {
    font-size: 0.92rem;
    font-weight: 600;
    color: #e9f8ff;
  }
  .toggle-switch {
    position: relative;
    display: inline-block;
    width: 44px;
    height: 24px;
    flex-shrink: 0;
  }
  .toggle-switch input {
    opacity: 0;
    width: 0; height: 0;
    position: absolute;
  }
  .toggle-track {
    position: absolute;
    inset: 0;
    border-radius: 24px;
    background: rgba(255,255,255,0.14);
    border: 1.5px solid rgba(255,255,255,0.18);
    transition: background 0.22s, border-color 0.22s;
    cursor: pointer;
  }
  .toggle-track::after {
    content: '';
    position: absolute;
    top: 2px; left: 2px;
    width: 16px; height: 16px;
    border-radius: 50%;
    background: rgba(255,255,255,0.55);
    transition: transform 0.22s, background 0.22s;
  }
  .toggle-switch input:checked + .toggle-track {
    background: rgba(115,246,229,0.35);
    border-color: #73f6e5;
  }
  .toggle-switch input:checked + .toggle-track::after {
    transform: translateX(20px);
    background: #73f6e5;
  }
  /* badge on/off nel mini-pill-header */
  .toggle-badge {
    margin-left: auto;
    margin-right: 10px;
    font-size: 0.75rem;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 20px;
    letter-spacing: 0.03em;
  }
  .toggle-badge.on {
    background: rgba(115,246,229,0.22);
    color: #73f6e5;
    border: 1px solid rgba(115,246,229,0.4);
  }
  .toggle-badge.off {
    background: rgba(255,255,255,0.08);
    color: rgba(255,255,255,0.45);
    border: 1px solid rgba(255,255,255,0.12);
  }
  /* hint testo piccolo */
  .card-bg-hint {
    font-size: 0.83rem;
    color: rgba(233,248,255,0.55);
    margin-bottom: 10px;
    line-height: 1.4;
  }

  /* ── riga bottoni in fondo ── */
  .bottom-actions {
    display: flex;
    gap: 10px;
    padding: 16px 16px 20px;
    justify-content: center;
    flex-wrap: wrap;
  }
  .apply-btn {
    flex: 1 1 0;
    min-width: 120px;
    font-size: 0.97rem;
    padding: 11px 18px;
    border: 2px solid #73f6e5;
    color: #073a34;
    background: #73f6e5;
    border-radius: 14px;
    cursor: pointer;
    font-weight: 800;
    transition: transform .12s ease, filter .12s ease;
  }
  .apply-btn:hover {
    transform: translateY(-1px);
    filter: brightness(1.07);
  }
  .reset-button {
    flex: 1 1 0;
    min-width: 100px;
    border: 2px solid #ff4c6a;
    color: #ff4c6a;
    font-size: 0.97rem;
    font-weight: 700;
    padding: 11px 18px;
    background: transparent;
    border-radius: 14px;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
  }
  .reset-button:hover {
    background: rgba(255,76,106,0.15);
    color: #fff;
  }
`;
