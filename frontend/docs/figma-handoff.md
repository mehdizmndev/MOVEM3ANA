# MOVE M3ANA Figma Handoff

This package turns the current product into a Figma-ready handoff. It includes:

- Full desktop mockup coverage for every current route.
- Mobile mockups for the key user flows.
- Foundations for colors, type, spacing, and reusable components.
- A suggested Figma page structure so the file stays organized.

## Deliverables In This Repo

- Screenshots: `docs/mockups/desktop/*.png`
- Mobile screenshots: `docs/mockups/mobile/*.png`
- Capture automation: `scripts/capture-mockups.mjs`

## Suggested Figma File Structure

1. `00 Cover`
2. `01 Foundations`
3. `02 Components`
4. `03 Desktop Screens`
5. `04 Mobile Screens`
6. `05 Flows`

## Foundations

### Color Tokens

Use these as named Figma color styles:

- `Primary / Base`: `#A04100`
- `Primary / Container`: `#FF6B00`
- `Secondary / Base`: `#705D00`
- `Secondary / Container`: `#FDD400`
- `Background / Base`: `#FCF9F8`
- `Surface / Base`: `#FCF9F8`
- `Surface / Low`: `#F6F3F2`
- `Surface / Container`: `#F0EDED`
- `Surface / High`: `#EAE7E7`
- `Surface / Highest`: `#E5E2E1`
- `Text / Primary`: `#1C1B1B`
- `Text / Muted`: `#5F5E5E`
- `Text / Surface Variant`: `#5A4136`
- `Outline`: `#8E7164`
- `Outline / Variant`: `#E2BFB0`
- `Error`: `#BA1A1A`

### Dark Theme Notes

The app uses a dark class with stone surfaces rather than a separate full token map. For mockups, use:

- `Dark / Background`: `#0C0A09`
- `Dark / Surface`: `#1C1917`
- `Dark / Elevated`: `#292524`
- `Dark / Border`: `#44403C`
- `Dark / Text`: `#F5F5F4`
- Keep `Primary / Container` as `#FF6B00`
- Keep `Secondary / Container` as `#FDD400`

### Typography

- `Headline`: Barlow Condensed
- `Body`: Inter
- Headline usage: all-uppercase, black or bold, tight tracking, often italic for hero moments
- Body usage: supporting copy, metadata, labels, forms

Suggested text styles:

- `Display / Hero`: Barlow Condensed, 96/86, Black, Uppercase
- `Display / Section`: Barlow Condensed, 56/52, Black, Uppercase
- `Heading / Card`: Barlow Condensed, 32/32, Bold, Uppercase
- `Title / UI`: Inter, 24/30, Bold
- `Body / Large`: Inter, 18/30, Regular
- `Body / Base`: Inter, 14/22, Regular
- `Label / Caps`: Inter, 10/14, Bold, Uppercase, 0.16em tracking

### Radius, Shadow, and Spacing

- Radius scale: `8 / 16 / 24 / 32 / Full`
- Common card radius: `24`
- Hero CTA radius: `16` or `9999`
- Card shadow: soft, low blur for content cards
- Accent shadow: orange glow for primary CTA and featured states
- Main desktop container width: `1536px max`
- Common horizontal padding: `24px`, `32px`, `48px`
- Vertical section rhythm: `96px`

## Component Library

Build these as reusable components in Figma:

- `Navbar / Desktop`
- `Navbar / Search`
- `Brand / Logo`
- `Button / Primary`
- `Button / Secondary`
- `Button / Ghost`
- `Button / Icon Circle`
- `Chip / Sport`
- `Chip / Status`
- `Card / Club`
- `Card / Activity Session`
- `Card / Pricing`
- `Card / Review`
- `Card / Metric`
- `Card / Admin Stat`
- `Card / Map Result`
- `Input / Text`
- `Input / Select`
- `Input / Range`
- `Tabs / Underline`
- `Footer / Marketing`
- `Sidebar / Admin`
- `Map Pin / Active`
- `Map Pin / Default`

## Screen Inventory

### Desktop Screens

Create one desktop frame per screen using the images in `docs/mockups/desktop/` as the visual reference:

- `Home`: hero, sports chips, featured clubs carousel, promotions, how-it-works
- `Map Explorer`: filter sidebar, search, result cards, map viewport, selected-club summary
- `Club Detail`: hero, sticky tab bar, active sessions, gallery, offer card, reviews, map card
- `Club Events`: hero, metrics strip, event cards, slot chips, booking CTAs, club summary
- `Booking`: form layout, selected-session summary, club overview, reviews
- `Pricing`: hero, three pricing cards, comparison table, FAQ accordion, CTA banner
- `Auth / Login`: split tabs, login form, social buttons
- `Auth / Sign Up`: role toggle, signup form, terms block
- `Forgot Password`: reset card
- `Admin`: left sidebar, top search/header, stats row, chart, settings form, activity column

### Mobile Screens

Use the images in `docs/mockups/mobile/` for the mobile frame references:

- `Home / Mobile`
- `Map / Mobile`
- `Club / Mobile`
- `Booking / Mobile`
- `Pricing / Mobile`
- `Auth / Login / Mobile`

## Flow Groups

Arrange these prototype flows in Figma:

1. Discovery flow
- Home
- Map Explorer
- Club Detail
- Club Events
- Booking

2. Conversion flow
- Home
- Pricing
- Auth Sign Up

3. Retention flow
- Auth Login
- Club Detail
- Booking

4. Operator flow
- Auth Login
- Admin Dashboard

## Layout Notes By Screen

### Home

- Full-screen hero with dark image overlay and large italic display headline.
- Popular sports section uses pill chips with active orange state.
- Featured clubs is a horizontal card rail with circular arrow controls.
- Promotions use a text-and-cards split.
- How-it-works uses three icon tiles with playful rotation.

### Map Explorer

- Desktop layout is a persistent left filter rail plus a full-height map.
- Result cards are compact, image-led, and stacked vertically.
- The selected map pin reveals a floating summary card near the bottom-right.
- Mobile swaps between list and map with a bottom segmented control.

### Club Detail

- Large edge-to-edge hero image with club metadata anchored to the bottom.
- Sticky tab bar directly under the hero.
- Main layout becomes a two-column content plus sidebar composition.
- Active sessions use strong price emphasis and a direct booking CTA.

### Club Events

- Hero is a contained banner card rather than an edge-to-edge section.
- Event cards balance content on the left with booking slots on the right.
- Use badge, schedule, and pricing blocks as reusable patterns.

### Booking

- Two-column layout with the form taking priority.
- Top content includes back link, title, and rating summary.
- Form fields use soft surfaces and bottom-border emphasis.
- Sidebar repeats club trust signals.

### Pricing

- Pricing cards sit in a centered three-column grid.
- The middle plan is scaled up and highlighted in orange.
- Comparison table uses strong column alignment and icon cells.
- FAQ uses stacked accordion rows.

### Auth And Reset

- Centered auth card over a soft blurred orange/yellow background.
- Tabs are part of the card header.
- Inputs use underlined emphasis rather than fully outlined boxes.

### Admin

- Fixed left sidebar and fixed inner top bar.
- Main content is a dense dashboard with analytics and operational controls.
- Use stronger contrast and tighter spacing than the public pages.

## Asset Capture Workflow

If the UI changes, regenerate the mockup images with:

```bash
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
node scripts/capture-mockups.mjs
```

The script expects the preview server at `http://127.0.0.1:4173`.
