# MV Colours — Master Checklist

Every feature, design detail, backend system, and business workflow planned for
the site, organized into phases so the next step is always clear.

---

## 🎨 Phase 1: Design, Layout & Visual Storytelling *(Current Phase)*

### Core Visual System

- [ ] **"Celestial Hope" Palette:** Apply Warm Linen Cream (`#FAF8F5`), Midnight Slate (`#0F172A`), Divine Gold (`#F59E0B`), Aurora Violet (`#7C3AED`), and Hope Teal (`#06B6D4`).
- [ ] **Scroll-Triggered Fade Transitions:** Use Framer Motion so section headers, cards, and images smoothly float up as visitors scroll.

### Navigation & Header

- [ ] **Minimal Gallery Header:** Logo, core navigation links, and a live status pill (`🟢 2/3 Commission Slots Open`).
- [ ] **Two-Part Gallery Showcase:**
  - **Browse Collections:** Narrative-driven series cards (e.g. *Celestial Series*, *Solitude Studies*).
  - **Categories of Painting:** Taxonomy bar filtering by medium (*Oil, Acrylic, Charcoal, Digital*) and canvas size.

### Hero & Interactive Sections

- [ ] **Cinematic Hero Reveal:** A blank canvas background video with a paint droplet splash that transitions into a completed painting as UI text fades in.
- [ ] **Scroll-Driven Artwork Focus:** A pinned section where scrolling down smoothly zooms into an artwork to highlight brushstrokes and details.
- [ ] **Auto-Scrolling Reviews Marquee:** Dual infinite-looping horizontal rows of customer reviews with glassmorphic cards that pause on hover.
- [ ] **Interactive "About Creator" Section:**
  - Animated SVG artist signature.
  - Clickable studio workspace hotspots (revealing materials and rituals).
  - Mini studio audio note player.

---

## 🖼️ Phase 2: Media & Content Preparation

- [ ] **HD Image Upscaling:** Run raw artwork photos through Upscayl (free AI app) before uploading.
- [ ] **Next.js Image Optimization:** Utilize `<Image/>` tags for fast image loading.
- [ ] **Artwork Process Sliders:** Draggable before/after sliders showing the rough initial sketch vs. the completed painting.
- [ ] **Interactive Lightbox Modal:** Full-screen high-res preview showing piece stories, physical dimensions, and an *"Inquire About This Piece"* CTA button.

---

## 💳 Phase 3: E-Commerce, 50/50 Payments & Location Intelligence

- [ ] **Step-by-Step Commission Wizard:** An inquiry form where clients select medium, dimensions, and deadline to get an instant estimated price range.
- [ ] **Stripe 50/50 Deposit System:**
  - Charge a **50% deposit** upfront to lock in the commission slot.
  - Charge the remaining **50% balance** upon final artwork approval before shipping.
- [ ] **Location & Dynamic Shipping:** Automatically adjust currency and calculate international shipping costs based on the customer's country at checkout.
- [ ] **Automated Late Delivery Discount:** Logic that auto-applies a 10–15% discount to the final 50% balance if completion exceeds the agreed deadline.

---

## 🗄️ Phase 4: Database & Business Communication

- [ ] **Supabase Backend:**
  - `customers` table (contact details, location).
  - `inquiries` table (custom commission requests).
  - `orders` table (deposit status, balance status, agreed deadline, delivery date).
  - `artworks` and `reviews` tables.
- [ ] **Hostinger Business Email:** Set up `orders@yourdomain.com` inside Hostinger.
- [ ] **Automated Email Notifications:** Integrate Nodemailer or Resend so Hostinger SMTP sends instant receipt and status update emails to clients.

---

## 🔒 Phase 5: Hosting, Domain & Security

- [ ] **Git Safety Checkpoints:** Keep experimenting on the `design-experiment` branch until everything looks perfect.
- [ ] **Vercel Deployment:** Host the Next.js frontend on Vercel for fast global performance and automatic free SSL/HTTPS security.
- [ ] **Domain Connection:** Point the Hostinger custom domain DNS to Vercel.
- [ ] **Secure Environment Variables:** Safely store Supabase keys, Stripe keys, and Hostinger SMTP passwords in Vercel settings (never exposed in public code).

---

## Known gaps in the current draft

Carried over from the frontend-only build, both worth closing before the site
goes anywhere public:

- **The commission form discards every lead.** `handleSubmit` in
  `src/components/commission-intake.tsx` only sets local state and shows a
  toast — nothing is sent or stored. Closed by Phase 3/4.
- **All 10 artworks are Unsplash stock**, presented with real titles and
  prices in `src/lib/artworks.ts`. Closed by Phase 2.
