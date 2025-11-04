# Design Guidelines: ATM Crackers E-Commerce Platform

## Design Approach

**Reference-Based E-Commerce**: Drawing inspiration from Shopify's product-centric layouts, Etsy's trust-building elements, and festive marketplace aesthetics. This celebratory product category demands vibrant presentation with clear pricing hierarchy and trust signals.

## Typography System

**Font Families**:
- Primary: Inter (Google Fonts) - clean, modern sans-serif for UI and body text
- Accent: Playfair Display (Google Fonts) - elegant serif for promotional headlines and special offers

**Hierarchy**:
- Hero Headlines: 4xl to 6xl, Playfair Display, font-bold
- Section Headers: 3xl to 4xl, Inter, font-bold
- Product Titles: xl to 2xl, Inter, font-semibold
- Pricing (Original): lg, Inter, font-medium with line-through
- Pricing (Discounted): 2xl to 3xl, Inter, font-bold
- Body Text: base to lg, Inter, font-normal
- Small Print/Labels: sm to xs, Inter, font-medium

## Layout System

**Spacing Primitives**: Use Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24 for consistent rhythm
- Micro spacing: p-2, gap-2 (tight elements)
- Component padding: p-4, p-6 (cards, buttons)
- Section spacing: py-12, py-16, py-20 (desktop), py-8, py-12 (mobile)
- Container margins: mx-4, mx-6, mx-8

**Grid Strategy**:
- Desktop: 4-column product grid (grid-cols-4)
- Tablet: 3-column grid (md:grid-cols-3)
- Mobile: 2-column grid (grid-cols-2)
- Featured products: 3-column on desktop (lg:grid-cols-3)

**Container Widths**:
- Main content: max-w-7xl mx-auto
- Product lists: max-w-screen-2xl
- Text content: max-w-4xl
- Cart/Checkout: max-w-6xl

## Component Library

### Header Navigation
- Sticky header with shadow on scroll
- Logo left, main navigation center, cart icon with badge right
- Search bar integrated (expandable on mobile)
- Trust badge: "Free Shipping on Orders Over ₹999"
- Mobile: Hamburger menu with slide-in drawer

### Hero Section (Home Page)
- Full-width hero at 70vh (not forced 100vh)
- Large festive product imagery showcasing crackers/fireworks
- Centered overlay content with blurred background for text readability
- Headline + Subheadline + Primary CTA
- Discount badge prominently displayed ("90% OFF Storewide")
- Buttons on images use backdrop-blur-md with semi-transparent backgrounds

### Product Cards
- Image container with 4:3 aspect ratio
- Hover: subtle scale transform (scale-105) with transition
- Original price struck through (line-through, opacity-60)
- Discounted price prominent and large
- Discount percentage badge (absolute positioned, top-right)
- Quick "Add to Cart" button on hover
- Product category tag (top-left badge)

### Product Detail Page
- Two-column layout (lg:grid-cols-2)
- Left: Product image gallery with thumbnails
- Right: Product information, pricing hierarchy, quantity selector, add to cart
- Tabbed sections below: Description, Specifications, Safety Information
- Related products carousel at bottom (4-5 items)

### Shopping Cart
- Side drawer on desktop (slide from right)
- Full page on mobile
- Line items with thumbnail, title, quantity controls, subtotal
- Sticky footer with totals breakdown and checkout button
- Empty state with "Continue Shopping" CTA

### Checkout Page
- Two-column layout (lg:grid-cols-3, 2/3 + 1/3 split)
- Left: Shipping form, billing form (multi-step or single form)
- Right: Sticky order summary with coupon code input
- Trust signals: secure checkout badges, accepted payment icons
- Progress indicator if multi-step

### Order Confirmation
- Centered success message with check icon
- Order number prominently displayed
- Itemized invoice component
- Download invoice button (with download icon)
- "Continue Shopping" secondary action

### Invoice Component
- Structured table layout
- Header: Company info, order details, customer info
- Body: Product table with quantities and pricing
- Footer: Subtotal, discount breakdown, coupon applied, final total
- Print-friendly styling considerations

### Footer
- Four-column layout (desktop)
- Column 1: About + logo
- Column 2: Quick Links (Shop, About, Contact, FAQ)
- Column 3: Customer Service (Returns, Shipping, Safety Info)
- Column 4: Newsletter signup + social media icons
- Bottom bar: Copyright, payment methods, trust badges

### Search & Filter Sidebar
- Category checkboxes with product counts
- Price range slider
- Sort dropdown (Price: Low to High, etc.)
- Active filters display with clear all option

### Promotional Banners
- Top announcement bar: "Use code DEMO50 for 50% OFF!"
- Dismissible with close icon
- Urgent/festive messaging for seasonal sales

### Trust Elements Throughout
- Security badges near checkout
- Customer testimonials on home page (3-column grid)
- Delivery timeline icons (Order → Process → Ship → Deliver)
- Safety certifications for fireworks products

## Images Strategy

**Hero Section**: 
- Large, vibrant image showcasing colorful crackers/fireworks display or festive celebration
- Dimensions: 1920x1080 minimum
- Position: Background with overlay gradient for text legibility
- Blurred button backgrounds for CTAs overlaid on image

**Product Images**:
- Consistent white or subtle gradient backgrounds
- High-quality product photography at 800x800px minimum
- Thumbnail gallery for product detail pages (100x100px)
- Lifestyle images showing products in use (celebrations, festivities)

**Category Images**:
- Banner images for category pages (1200x400px)
- Festive, thematic imagery matching product types

**About/Contact Pages**:
- Team photos or warehouse/operations imagery (humanize brand)
- Location imagery if relevant
- Dimensions: 600x400px for standard content images

**Trust Signals**:
- Small icons for features (Free Shipping, Secure Payment, etc.) - use icon library
- Payment method logos
- Certification badges

## Accessibility & Interaction

- All interactive elements have min-height of h-10 or h-12
- Focus states with visible outline (ring-2)
- Alt text for all product images
- Keyboard navigation support
- Form inputs with clear labels and error states
- Loading states for cart updates and checkout

## Special Pricing Display Pattern

Create visual hierarchy emphasizing the deal:
- Original price: smaller, muted, struck-through
- Arrow or "Now:" label
- Discounted price: 2-3x larger, bold, prominent
- Savings amount: badge or secondary text ("Save ₹X,XXX!")
- Coupon section: bordered box with dashed outline, copy code button

## Animations

Use sparingly:
- Smooth page transitions
- Cart item additions (brief scale animation)
- Hover state transforms on cards
- Loading spinners for async operations
No scroll-triggered animations, no complex hero animations

## Page-Specific Layouts

**Home**: Hero → Featured Categories (3-col) → Best Sellers (4-col grid) → Special Offers Banner → Testimonials (3-col) → Newsletter Signup

**Products List**: Breadcrumbs → Filter Sidebar + Product Grid → Load More Button (not infinite scroll)

**About**: Hero banner → Mission statement (centered max-w-3xl) → Values grid (3-col) → Team section if applicable

**Contact**: Two-column (form + contact info/map placeholder) → FAQ accordion below

This design creates a festive, trustworthy e-commerce experience with clear emphasis on discounts while maintaining professional credibility for safe fireworks purchasing.