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
  .apply-row {
    display: flex;
    justify-content: center;
    padding: 16px 0;
  }

  .apply-btn {
    font-size: 1.1rem;
    padding: 12px 24px;
    border: 2.5px solid #73f6e5;
    color: #073a34;
    background: #73f6e5;
    border-radius: 14px;
    cursor: pointer;
    font-weight: 800;
    transition: transform .12s ease, box-shadow .12s ease, filter .12s ease;
  }
  .apply-btn:hover {
    transform: translateY(-1px);
    filter: brightness(1.05);
  }

  .mini-pill {
    background: rgba(44,70,100,0.23);
    border: 1.5px solid rgba(255,255,255,0.12);
    box-shadow: 0 3px 22px rgba(70,120,220,0.13);
    backdrop-filter: blur(10px) saturate(1.2);
    border-radius: 24px;
    margin: 8px 16px;
    overflow: hidden;
    transition: background 0.18s, box-shadow 0.18s, border 0.18s;
  }
  .mini-pill-header {
    display: flex;
    align-items: center;
    padding: 15px 22px;
    font-weight: 800;
    color: var(--section-accent, #73f6e5);
    cursor: pointer;
    user-select: none;
  }
  .mini-pill-header .chevron {
    margin-left: auto;
    font-size: 1.2em;
    transition: transform 0.18s;
  }
  .mini-pill.expanded .mini-pill-header .chevron {
    transform: rotate(90deg);
  }
  .mini-pill-content {
    padding: 15px 22px 16px;
    animation: pill-expand 0.22s cubic-bezier(.5,1.2,.6,1) both;
    position: relative;
    z-index: 1;
  }
  @keyframes pill-expand {
    from { opacity: 0; transform: translateY(-12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .input-group {
    background: rgba(44,70,100,0.23);
    border: 1.5px solid rgba(255,255,255,0.13);
    box-shadow: 0 2px 14px rgba(70,120,220,0.10);
    border-radius: 18px;
    margin-bottom: 13px;
    padding: 14px 18px 10px;
  }
  .input-group label {
    display: block;
    font-size: 1.13rem;
    font-weight: 700;
    color: var(--section-accent, #73f6e5);
    margin-bottom: 6px;
  }
  input[type="color"] {
    width: 56px; height: 32px;
    border: 2px solid #fff4;
    border-radius: 9px;
    cursor: pointer;
  }
  input[type="range"] { width: 100%; }
  input[type="text"] {
    width: 100%;
    border: 1px solid #444;
    border-radius: 6px;
    padding: 8px;
    background-color: #202020;
    color: #f1f1f1;
    font-size: 0.97rem;
  }
  .reset-button {
    border: 3.5px solid #ff4c6a !important;
    color: #ff4c6a !important;
    font-size: 1.15rem;
    font-weight: 700;
    box-shadow: 0 2px 24px #ff4c6a44;
    padding: 12px 38px !important;
    margin: 20px auto 0 auto !important;
    display: block;
    background: transparent;
    border-radius: 24px !important;
    transition: background 0.18s, color 0.18s, box-shadow 0.18s;
  }
  .reset-button:hover {
    background: rgba(255,76,106,0.18) !important;
    color: #fff !important;
    box-shadow: 0 6px 32px #ff4c6abf;
  }
`;
