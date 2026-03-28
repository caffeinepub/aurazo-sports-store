# Aurazo Sports Store

## Current State
New project — no existing application files.

## Requested Changes (Diff)

### Add
- Full ecommerce homepage with 10 sections in strict order: announcement bar, navbar, hero, social proof bar, featured product, benefits, reviews, urgency/countdown, FAQ, footer
- Product page (/product) with sticky ATC bar, tabs, and reviews
- Side drawer cart with order bump
- Admin panel (/admin) for content management (product name, prices, stock, hero text, reviews, FAQ, countdown settings)
- Motoko backend for persisting admin-managed content: product data, reviews, FAQ, site settings, cart/order state
- Countdown timer (24h, resets daily via localStorage)
- Scroll-triggered fade-in animations via IntersectionObserver
- Bundle selector (Buy 1/2/3 with pricing cards)
- Size/variant selector and quantity stepper
- Cart state managed via React hooks

### Modify
N/A

### Remove
N/A

## Implementation Plan

### Backend (Motoko)
- `getStoreSettings` / `updateStoreSettings` — hero text, announcement bar text, countdown duration
- `getProduct` / `updateProduct` — product name, prices (single/bundle), stock count, benefits list
- `getReviews` / `updateReviews` — array of review objects (name, city, rating, text)
- `getFAQ` / `updateFAQ` — array of FAQ items (question, answer)
- Admin auth guard using principal check

### Frontend Pages
1. **HomePage** — all 10 sections, uses backend data for dynamic content
2. **ProductPage** (/product) — sticky ATC bar, bundle cards, tabs (Description | Size Guide | Reviews)
3. **AdminPage** (/admin) — form-based CMS for all editable content

### Frontend Components
- `AnnouncementBar` — scrolling marquee, neon green text on black
- `Navbar` — sticky, blur backdrop, cart icon with badge
- `HeroSection` — full-width dark bg, headline, CTA, rating
- `SocialProofBar` — horizontally scrolling ticker
- `FeaturedProduct` — bundle selector, size selector, quantity stepper, ATC button, trust badges, benefits
- `BenefitsGrid` — 4-card icon grid with hover neon borders
- `ReviewsSection` — 6-card grid with avatar initials, verified badge
- `UrgencySection` — countdown timer, progress bar, CTA
- `FAQAccordion` — accordion with 5 questions
- `Footer` — logo, links, payment icons
- `CartDrawer` — slide-in from right, order bump checkbox
- `StickyATCBar` — appears on scroll on /product page

### Design Tokens
- Background: #0a0a0a
- White: #ffffff
- Neon Green: #39ff14
- Neon Blue: #00f5ff
- Fonts: Barlow Condensed (headings), Inter (body) via Google Fonts
