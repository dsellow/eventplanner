# Event Command Center

**A professional all-in-one event planning web app — runs entirely in the browser, no server or login required.**

Built for independent event planners and in-house coordinators who manage corporate events, galas, fundraisers, brand activations, conferences, and milestone celebrations. One file. Every tool you need. Fully branded with your company name and colors.

---

## Live Demo

Deployed via Vercel — [your-url.vercel.app](https://your-url.vercel.app)

---

## What It Is

A single `index.html` file that functions as a complete event management system. Open it in any modern browser — Chrome, Edge, Safari, Firefox — and it works immediately. All data saves to the browser's `localStorage` so everything persists between sessions with no account or backend required.

---

## Features

### 14 Sections

| Section | What It Does |
|---|---|
| **My Events** | Save, switch, and manage multiple events in a library. Each event is a complete snapshot. |
| **Dashboard** | Live health scorecards for budget, vendors, tasks, guests, and run of show. Auto-alerts for overdue items and unsigned contracts. |
| **Event Info** | Client details, event type, date, venue, headcount, budget, dress code, catering style, and vision statement. |
| **Budget Tracker** | Line-item budget with estimated vs. quoted vs. paid columns, category breakdown chips, animated progress bar, and CSV export. |
| **Vendor Master** | Card-based vendor directory with contract status badges (Pending / Sent / Signed), deposit and balance tracking, and a slide-in detail drawer. |
| **Task Timeline** | 120+ pre-loaded tasks across 8 phases from 90 days out through post-event. Inline check-off, priority flags, and phase progress bars. |
| **Run of Show** | Minute-by-minute day-of timeline. Internal and client-facing views. One-click branded print export (landscape, letter). |
| **Guest List & RSVP** | Sortable table with RSVP status, meal preferences, dietary restrictions, table assignments, VIP flags, and +1 management. CSV import and export. |
| **Seating Chart** | Build tables, set capacity, assign guest names seat-by-seat. +1 names auto-suggest next to their accompanying guest. CSV export. |
| **Meal Planner** | Menu courses builder, dietary summary auto-populated from confirmed guests, meal count breakdown by type, bar/beverage notes. |
| **Venue & Logistics** | Coordinator contact, access windows, WiFi, capabilities checklist, vendor load-in schedule, 24-item walk-through checklist, and floor plan URL with direct open link. |
| **Moodboard** | Event theme, 5-color live palette picker, inspiration links, image URL grid, keyword tags, and brainstorm notes. |
| **Communications Log** | Reverse-chronological log of all vendor and client touchpoints with follow-up tracking, overdue alerts, and CSV export. |
| **Post-Event Debrief** | Unlocks after event date. Vendor star ratings, budget variance, client satisfaction score, and lessons learned archive. |

### Brand Customization
- Company name, planner name, logo URL, and footer text update every header in the app instantly
- Primary accent color with live color picker and 8 preset swatches
- Currency symbol and date format preferences

### Data Management
- Full JSON backup export and import
- Duplicate event (keeps brand, clears event data)
- Reset all data with double-confirmation

---

## Tech Stack

| Layer | Technology |
|---|---|
| Structure | HTML5 |
| Styling | CSS3 with custom properties (variables) |
| Logic | Vanilla JavaScript — no frameworks, no dependencies |
| Persistence | Browser `localStorage` |
| Fonts | Google Fonts — DM Serif Display + DM Sans |
| Deployment | Vercel (static) |
| Version control | GitHub |

No npm. No build step. No `node_modules`. No backend. No database.

---

## Getting Started

### Option 1 — Open locally
1. Download `index.html`
2. Double-click to open in Chrome or any modern browser
3. Open Settings (⚙ top right) and enter your company name and brand color
4. Navigate to Event Info and start your first event

### Option 2 — Deploy to Vercel
1. Fork or clone this repository
2. Connect your GitHub repo to [Vercel](https://vercel.com)
3. Vercel auto-detects the static file and deploys to a public URL
4. Every push to `main` triggers an automatic redeploy in ~30 seconds

---

## Customizing the Color Scheme

All colors are controlled by CSS custom properties at the top of `index.html` inside the `<style>` block:

```css
:root {
  --brand-primary: #B07D74;   /* accent color — also changeable in Settings */
  --bg-base:    #F5F0EC;       /* main background */
  --bg-surface: #FFFFFF;       /* cards and panels */
  --bg-elevated: #EDE8E4;      /* hover states and table headers */
}
```

Change `--bg-base`, `--bg-surface`, and `--bg-elevated` together to switch the theme. The brand primary color can also be changed live inside the app via **Settings → Brand Color**.

---

## Multiple Events

Open **My Events** in the sidebar to:
- Save the current event to a library (full snapshot of all data)
- Switch between saved events with one click
- Duplicate an event as a starting point for a similar one
- View key stats (budget, vendors, guests, tasks) per event at a glance

Up to ~20–30 fully built events fit in browser localStorage (≈ 5MB).

---

## Selling on Etsy

This file is designed to be delivered as a digital download. The buyer:
1. Downloads `index.html` (or a renamed version)
2. Opens it in Chrome
3. Enters their company name in Settings — the entire app rebrand instantly
4. Saves and reuses for every event they manage

Recommended price point: **$45–$97** based on comparable digital planners on Etsy and the professional feature depth of this product.

---

## File Structure

```
/
├── index.html      ← the entire product (all HTML, CSS, JS in one file)
└── README.md       ← this file
```

---

## Browser Support

| Browser | Support |
|---|---|
| Chrome 90+ | ✅ Full support |
| Edge 90+ | ✅ Full support |
| Safari 14+ | ✅ Full support |
| Firefox 88+ | ✅ Full support |
| Mobile Chrome | ✅ Responsive layout |
| Mobile Safari | ✅ Responsive layout |

---

## Known Limitations

- Data is stored in the **browser's localStorage** — clearing browser data will erase event data unless a JSON backup has been exported first
- The app is **not synced across devices** — use the Export Backup feature to move data between computers
- Images in the Moodboard section are loaded from external URLs — they require an internet connection to display
- The Run of Show print export works best in Chrome

---

## Roadmap Ideas

- [ ] PDF export for full event summary
- [ ] Client-facing portal view (read-only shareable link)
- [ ] Email/SMS integration for guest RSVP collection
- [ ] Vendor contract e-sign integration
- [ ] White-label version for agencies

---

## License

This project is proprietary. The code and design are not open source. Do not redistribute or resell the source file without permission.

---

## Built With

Designed and developed using Claude (Anthropic) as a fully functional no-code/low-code digital product for professional event planners.
