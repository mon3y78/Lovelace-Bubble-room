// src/panels/shared-styles.js
import { css } from 'lit';

export const sharedPanelStyles = css`
  :host { display: block; }

  .glass-panel {
    margin: 0 !important;
    width: 100%;
    box-sizing: border-box;
    border-radius: 40px;
    position: relative;
    background: var(--bubble-glass-bg, var(--glass-bg, rgba(167,255,175,0.22)));
    box-shadow: var(--bubble-glass-shadow, var(--glass-shadow, 0 2px 24px rgba(167,255,175,0.13)));
    overflow: hidden;
  }
  .glass-panel::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: var(--bubble-glass-sheen,
      var(--glass-sheen,
        linear-gradient(120deg, rgba(255,255,255,0.11),
        rgba(255,255,255,0.07) 70%, transparent 100%)
      )
    );
    pointer-events: none;
  }

  .glass-header {
    padding: 22px 0;
    text-align: center;
    font-size: 1.12rem;
    font-weight: 700;
    color: var(--bubble-header-color, #fff);
  }

  .input-group.autodiscover {
    margin: 0 16px 13px;
    padding: 14px 18px 10px;
    background: rgba(44,70,100,0.23);
    border: 1.5px solid rgba(255,255,255,0.13);
    box-shadow: 0 2px 14px rgba(70,120,220,0.10);
    border-radius: 18px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .input-group.autodiscover input {
    margin-right: 8px;
  }
  .input-group.autodiscover label {
    margin: 0;
    font-weight: 700;
    color: var(--bubble-autodiscover-label-color, #fff);
  }

  .mini-pill {
    background: rgba(44,70,100,0.23);
    border: 1.5px solid rgba(255,255,255,0.13);
    box-shadow: 0 2px 14px rgba(70,120,220,0.10);
    backdrop-filter: blur(7px) saturate(1.2);
    border-radius: 24px;
    margin: 8px 16px;
    overflow: hidden;
  }
  .mini-pill-header {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    cursor: pointer;
    user-select: none;
    font-weight: 700;
    color: var(--bubble-accent-color, #8cff8a);
  }
  .mini-pill-header .chevron {
    margin-left: auto;
    transition: transform 0.2s;
  }
  .mini-pill.expanded .mini-pill-header .chevron {
    transform: rotate(90deg);
  }
  .mini-pill-content {
    padding: 12px 16px 16px;
    animation: pill-expand 0.2s ease-out both;
  }
  @keyframes pill-expand {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .input-group {
    margin-bottom: 12px;
  }
  .input-group label {
    display: block;
    font-weight: 600;
    margin-bottom: 6px;
    color: var(--bubble-accent-color, #8cff8a);
  }

  ha-selector,
  ha-icon-picker {
    width: 100%;
    box-sizing: border-box;
  }
  ha-selector::part(combobox) {
    min-height: 40px;
  }

  .filter-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 6px;
  }

  .clear-chip {
    border: 2px solid var(--bubble-clear-chip-color, var(--warning-color, #ff8a65));
    color: var(--bubble-clear-chip-color, var(--warning-color, #ff8a65));
    background: transparent;
    border-radius: 999px;
    padding: 6px 12px;
    font-size: 0.9rem;
    font-weight: 800;
    cursor: pointer;
    transition: background .15s, color .15s, box-shadow .15s, border-color .15s;
    box-shadow: 0 1px 10px rgba(255,138,101,0.25);
  }
  .clear-chip:hover {
    background: rgba(255,138,101,0.18);
    color: #fff;
    border-color: #ff8a65;
    box-shadow: 0 3px 16px rgba(255,138,101,0.45);
  }

  .reset-button {
    border: 3.5px solid #ff4c6a;
    color: #ff4c6a;
    border-radius: 24px;
    padding: 12px 38px;
    background: transparent;
    cursor: pointer;
    display: block;
    margin: 20px auto;
    font-size: 1.15rem;
    font-weight: 700;
    box-shadow: 0 2px 24px #ff4c6a44;
    transition: background 0.18s, color 0.18s, box-shadow 0.18s;
  }
  .reset-button:hover {
    background: rgba(255,76,106,0.18);
    color: #fff;
    box-shadow: 0 6px 32px #ff4c6abf;
  }
`;
