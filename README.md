[![Install with HACS](https://img.shields.io/badge/HACS-Install-blue?style=for-the-badge&logo=home-assistant)](https://github.com/mon3y78/Lovelace-Bubble-room)
[![GitHub stars](https://img.shields.io/github/stars/mon3y78/Lovelace-Bubble-room?style=social)](https://github.com/mon3y78/Lovelace-Bubble-room/stargazers)
[![Community Forum](https://img.shields.io/badge/Forum-Home%20Assistant-blue?logo=home-assistant)](https://community.home-assistant.io/t/bubble-room/856230?u=ipilla)
[![Reddit](https://img.shields.io/badge/Reddit-Discussion-orange?logo=reddit)](https://www.reddit.com/r/homeassistant/s/Qgz9acN7Mr)
![Bubble Room](img/bubble-room-v3.png)
# ✨ Bubble Room Card – v4.0 for Home Assistant
The Ultimate Visual Room Controller Card
Customizable, responsive, and made for Home Assistant power users!
Zero YAML required – everything is visual!

# 🚀 Main Features
Visual Editor Experience 🎨
Everything is configurable via a modern visual editor – no YAML needed! All options are split into intuitive sections:
Room Settings, Sub-Button, Mushroom Entities, Camera, Climate, Sensor, Colors.
![Bubble Room](img/bubble-room-v3b.png)
### Room Settings 🏠
Set room name & main icon (icon-picker)
Configure tap/hold actions: navigate, toggle, more-info, call-service
Pick your presence entity (entity-picker)
### Sub-Buttons 🎛️
Up to 4 customizable sub-buttons per room
Each with independent entity (entity-picker), icon (icon-picker), and tap/hold actions
Complete color customization: active/inactive backgrounds & icons (with RGBA color pickers)
### Mushroom Entities 🍄
Up to 5 “bubble” entities around the main icon
Each can be assigned its own entity and icon
Perfect for quick-access devices, scenes, or extra info
### Camera Support 🎥
Add a camera entity with a dedicated icon and “mushroom” position
### Climate Control 🌡️
Native support for a climate/thermostat entity, with icon and actions
### Sensor Section 📊
Up to 6 sensors (temperature, humidity, CO₂, illuminance, PM, UV, noise, pressure, VOC, etc.)
Pick type, entity, and unit for each sensor
### Full Color Customization 🖌️
Visual color pickers for every color field (Room & Subbutton sections)
RGBA + transparency sliders for backgrounds, icons, mushroom states, and more
### Responsive & Adaptive Layouts 📱💻
Two layouts: 6x3 (compact) and 12x4 (expanded) for perfect display on tablets, dashboards, Nest Hub, and phones
Sub-buttons automatically expand to fit available space
### All via GUI Components 🧩
Uses ha-entity-picker for entities (with dynamic Home Assistant suggestions)
Uses ha-icon-picker for icons (MDI & custom icons)
No need to type YAML, ever!

🚀 Version 4.0 Released!
Bubble Room Card v4.0 is here, bringing a whole new level of customization and smart automation for your Home Assistant dashboards!
This release includes a complete redesign of the editor, powerful new features, and even more flexibility for all your rooms, sensors, and devices.

✨ What’s New in v4.0?

Revamped Editor UI:
Modern visual style with gradient headers, colorful labels, pill buttons, emoji section titles, and a smoother layout.
Fully modular and easier to use—editing your Bubble Room config is now a joy!
Auto-Discovery by Area:
Instantly filter and assign entities for each section (climate, camera, sensor, presence, etc.) using Home Assistant’s area system.
Dynamic Icon and Entity Pickers:
Integrated ha-icon-picker and ha-entity-picker everywhere you select icons or entities.
Complete fallback icon set included.
Enhanced Section Support:
Camera, humidifier, lock, input_boolean, scene: all get their own controls and auto-discovery.
The sensor section now supports up to 4 fully configurable sensors (type + unit), with dynamic icon/unit suggestions.
Advanced Color Controls:
Set RGBA colors and transparency for every detail—active/inactive states, backgrounds, text, icons, subbuttons.
Room Layout and Entity Organization:
Choose from flexible layouts and arrange up to 7 secondary entities + 4 subbuttons for each room.
Fully Backward-Compatible:
Seamless upgrade: all your existing configurations continue to work!

## Community & Support

For discussions, feedback and support, visit the official thread on the Home Assistant Community Forum:

🔗 [Bubble Room - Home Assistant Community](https://community.home-assistant.io/t/bubble-room/856230?u=ipilla)

# Installation
## Via HACS
1. Go to HACS > Frontend.
2. Click on "Explore & Add Repositories" and add the Bubble Room GitHub repository.
3. Install the card and add the following resource in Lovelace:
     ```yaml
   url: https://github.com/mon3y78/Lovelace-Bubble-room
   type: dashboard
