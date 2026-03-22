// src/panels/color-presets.js
// Preset di colore per ColorPanel. Ogni preset definisce i colori di
// room, subbutton, mushroom e sensor.

export const COLOR_PRESETS = {
  green: {
    label: "Green",
    room: {
      icon_active: "#21df73",
      icon_inactive: "rgba(33,223,115,0.35)",
      background_active: "rgba(33,223,115,0.50)",
      background_inactive: "rgba(33,223,115,0.25)",
      text_active: "rgba(33,223,115,0.50)",
      text_inactive: "rgba(33,223,115,0.25)",
    },
    sub: {
      background_on: "rgba(33,223,115,0.50)",
      background_off: "rgba(33,223,115,0.25)",
      icon_on: "#21df73",
      icon_off: "rgba(33,223,115,0.35)",
    },
    mushroom: { active: "#21df73", inactive: "rgba(33,223,115,0.35)" },
    sensor: { sensor_active: "rgba(33,223,115,0.50)", sensor_inactive: "rgba(33,223,115,0.25)" },
  },

  blue: {
    label: "Blue",
    room: {
      icon_active: "#55afff",
      icon_inactive: "rgba(85,175,255,0.35)",
      background_active: "rgba(85,175,255,0.50)",
      background_inactive: "rgba(85,175,255,0.25)",
      text_active: "rgba(85,175,255,0.50)",
      text_inactive: "rgba(85,175,255,0.25)",
    },
    sub: {
      background_on: "rgba(85,175,255,0.50)",
      background_off: "rgba(85,175,255,0.25)",
      icon_on: "#55afff",
      icon_off: "rgba(85,175,255,0.35)",
    },
    mushroom: { active: "#55afff", inactive: "rgba(85,175,255,0.35)" },
    sensor: { sensor_active: "rgba(85,175,255,0.50)", sensor_inactive: "rgba(85,175,255,0.25)" },
  },

  amber: {
    label: "Amber",
    room: {
      icon_active: "#ff9b3d",
      icon_inactive: "rgba(255,155,61,0.35)",
      background_active: "rgba(255,155,61,0.50)",
      background_inactive: "rgba(255,155,61,0.25)",
      text_active: "rgba(255,155,61,0.50)",
      text_inactive: "rgba(255,155,61,0.25)",
    },
    sub: {
      background_on: "rgba(255,155,61,0.50)",
      background_off: "rgba(255,155,61,0.25)",
      icon_on: "#ff9b3d",
      icon_off: "rgba(255,155,61,0.35)",
    },
    mushroom: { active: "#ff9b3d", inactive: "rgba(255,155,61,0.35)" },
    sensor: { sensor_active: "rgba(255,155,61,0.50)", sensor_inactive: "rgba(255,155,61,0.25)" },
  },

  purple: {
    label: "Purple",
    room: {
      icon_active: "#bd64ff",
      icon_inactive: "rgba(189,100,255,0.35)",
      background_active: "rgba(189,100,255,0.50)",
      background_inactive: "rgba(189,100,255,0.25)",
      text_active: "rgba(189,100,255,0.50)",
      text_inactive: "rgba(189,100,255,0.25)",
    },
    sub: {
      background_on: "rgba(189,100,255,0.50)",
      background_off: "rgba(189,100,255,0.25)",
      icon_on: "#bd64ff",
      icon_off: "rgba(189,100,255,0.35)",
    },
    mushroom: { active: "#bd64ff", inactive: "rgba(189,100,255,0.35)" },
    sensor: { sensor_active: "rgba(189,100,255,0.50)", sensor_inactive: "rgba(189,100,255,0.25)" },
  },

  red: {
    label: "Red",
    room: {
      icon_active: "#ff5c6a",
      icon_inactive: "rgba(255,92,106,0.35)",
      background_active: "rgba(255,92,106,0.50)",
      background_inactive: "rgba(255,92,106,0.25)",
      text_active: "rgba(255,92,106,0.50)",
      text_inactive: "rgba(255,92,106,0.25)",
    },
    sub: {
      background_on: "rgba(255,92,106,0.50)",
      background_off: "rgba(255,92,106,0.25)",
      icon_on: "#ff5c6a",
      icon_off: "rgba(255,92,106,0.35)",
    },
    mushroom: { active: "#ff5c6a", inactive: "rgba(255,92,106,0.35)" },
    sensor: { sensor_active: "rgba(255,92,106,0.50)", sensor_inactive: "rgba(255,92,106,0.25)" },
  },

  yellow: {
    label: "Yellow",
    room: {
      icon_active: "#ffd633",
      icon_inactive: "rgba(255,214,51,0.35)",
      background_active: "rgba(255,214,51,0.50)",
      background_inactive: "rgba(255,214,51,0.25)",
      text_active: "rgba(255,214,51,0.50)",
      text_inactive: "rgba(255,214,51,0.25)",
    },
    sub: {
      background_on: "rgba(255,214,51,0.50)",
      background_off: "rgba(255,214,51,0.25)",
      icon_on: "#ffd633",
      icon_off: "rgba(255,214,51,0.35)",
    },
    mushroom: { active: "#ffd633", inactive: "rgba(255,214,51,0.35)" },
    sensor: { sensor_active: "rgba(255,214,51,0.50)", sensor_inactive: "rgba(255,214,51,0.25)" },
  },

  teal: {
    label: "Teal",
    room: {
      icon_active: "#00bfa5",
      icon_inactive: "rgba(0,191,165,0.35)",
      background_active: "rgba(0,191,165,0.50)",
      background_inactive: "rgba(0,191,165,0.25)",
      text_active: "rgba(0,191,165,0.50)",
      text_inactive: "rgba(0,191,165,0.25)",
    },
    sub: {
      background_on: "rgba(0,191,165,0.50)",
      background_off: "rgba(0,191,165,0.25)",
      icon_on: "#00bfa5",
      icon_off: "rgba(0,191,165,0.35)",
    },
    mushroom: { active: "#00bfa5", inactive: "rgba(0,191,165,0.35)" },
    sensor: { sensor_active: "rgba(0,191,165,0.50)", sensor_inactive: "rgba(0,191,165,0.25)" },
  },

  gray: {
    label: "Gray",
    room: {
      icon_active: "#c5c8ce",
      icon_inactive: "rgba(197,200,206,0.35)",
      background_active: "rgba(197,200,206,0.50)",
      background_inactive: "rgba(197,200,206,0.25)",
      text_active: "rgba(197,200,206,0.50)",
      text_inactive: "rgba(197,200,206,0.25)",
    },
    sub: {
      background_on: "rgba(197,200,206,0.50)",
      background_off: "rgba(197,200,206,0.25)",
      icon_on: "#c5c8ce",
      icon_off: "rgba(197,200,206,0.35)",
    },
    mushroom: { active: "#c5c8ce", inactive: "rgba(197,200,206,0.35)" },
    sensor: { sensor_active: "rgba(197,200,206,0.50)", sensor_inactive: "rgba(197,200,206,0.25)" },
  },
};
