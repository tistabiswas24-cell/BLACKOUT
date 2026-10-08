# ⚡ BLACKOUT — Offline-First Emergency Digital Kit

> *"Your emergency kit, even when everything goes offline."*

**BLACKOUT** is an offline-first PWA emergency digital kit built for crisis situations, network blackouts, infrastructure failures, and emergency preparedness. It operates 100% autonomously in the local browser via IndexedDB using Dexie.js, caching the application shell and offline map POIs for instant reliability.

---

## 🌟 Key Features

1. **100-Point Dynamic Readiness Engine**: Real-time evaluation of emergency readiness spanning contacts, medical card, SOS template, offline GIS map, survival checklist, and document vault.
2. **High-Contrast Tactical Emergency Mode**: Instant high-visibility emergency interface with massive touch targets. Press `Ctrl + Shift + E` anytime to trigger.
3. **Local Medical Profile Card**: Zero-network private health records, blood group, allergies, and emergency phone numbers stored exclusively in browser IndexedDB.
4. **SOS Payload Dispatcher**: Stage emergency SMS (`sms:?body=...`) and WhatsApp payloads pre-appended with hardware GPS coordinates.
5. **Offline GIS POI Map**: Leaflet interactive map showing local trauma hospitals, police stations, evacuation shelters, and fire stations with distance estimates.
6. **Survival Gear Checklist**: Categorized inventory (Water, Power, Medical, Documents, Communication) that feeds directly into the readiness engine.
7. **Document Vault Metadata**: Catalog digital and physical locations for passports, deeds, and insurance policies.
8. **Network Fault Simulation**: Test offline degradation gracefully with a single toggle in Settings.

---

## 🚀 Tech Stack

- **Client**: React 18, TypeScript, Vite, Tailwind CSS, React Router v6, Zustand, Dexie.js, Leaflet, Lucide React, Zod, `vite-plugin-pwa`
- **Server**: Node.js, Express, TypeScript, Cors, Zod, tsx
- **Root Orchestration**: `concurrently`

---

## 🛠️ Quick Start

### 1. Install Dependencies
```bash
npm run install:all
```

### 2. Run Concurrent Dev Mode
```bash
npm run dev
```
- **Client App**: `http://localhost:5173`
- **Express Backend**: `http://localhost:4000/api/health`

### 3. Production Build
```bash
npm run build
```

---

## 🛡️ Privacy Guarantee
Sensitive medical card details and personal emergency contact numbers are stored exclusively in IndexedDB inside your device's browser sandbox and are **never** transmitted across any network connection.
