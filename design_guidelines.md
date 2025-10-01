# Design Guidelines: Presentation Landing Page Builder

## Design Approach

**Selected Approach**: Hybrid Reference-Based + Design System

**Primary References**: 
- **Notion** (for the editor interface) - Clean, component-based UI with sidebar navigation
- **Webflow/Framer** (for the builder controls) - Visual editing tools with live preview
- **Linear** (for the polish and micro-interactions) - Smooth, professional aesthetic

**Generated Pages Reference**: Adapt to client branding with modern, presentation-focused aesthetics drawing from contemporary marketing sites (Apple, Stripe, Airbnb for structure and polish)

## Color Palette

### Builder Interface (Dark Mode Primary)
**Background Layers**:
- Primary Background: `220 15% 8%` (deep charcoal)
- Secondary Background: `220 15% 12%` (elevated surfaces)
- Tertiary Background: `220 15% 16%` (cards, modals)

**Accent Colors**:
- Primary Accent: `250 85% 60%` (vibrant purple-blue for CTAs, active states)
- Success: `142 76% 45%` (emerald green for confirmations)
- Warning: `38 92% 50%` (amber for alerts)
- Neutral Text: `220 10% 90%` (high contrast text)
- Muted Text: `220 10% 60%` (secondary text)

### Generated Pages (Dynamic - Client Branded)
- System provides color slot variables that adapt to uploaded brand colors
- Default modern gradient: `from-slate-900 via-purple-900 to-slate-900`
- Accent system maps to client primary brand color

## Typography

**Builder Interface**:
- **Primary Font**: Inter (via Google Fonts) - clean, modern, excellent legibility
- **Headings**: 600-700 weight, tight letter-spacing (-0.02em)
- **Body**: 400-500 weight, comfortable line-height (1.6)
- **Code/Technical**: JetBrains Mono for JSON configs display

**Generated Pages**:
- **Display Font**: Outfit or Space Grotesk for hero headlines (bold, modern)
- **Body Font**: Inter or System UI Stack for content
- Scale: 
  - Hero: text-6xl to text-8xl (responsive)
  - Section Headers: text-3xl to text-5xl
  - Body: text-base to text-lg

## Layout System

**Builder Interface Spacing**: Tailwind units of 4, 6, 8, 12, 16
- Sidebar: Fixed 280px width (md:320px on larger screens)
- Main canvas: Fluid with max-w-7xl container
- AI Chat: Fixed bottom panel 320px height (expandable to 480px)
- Component padding: p-4 to p-8 depending on hierarchy

**Generated Pages Spacing**: Tailwind units of 8, 12, 16, 20, 24, 32
- Section vertical spacing: py-16 (mobile) to py-32 (desktop)
- Container max-widths: max-w-7xl with px-6 to px-12 padding
- Grid gaps: gap-8 to gap-16 for card layouts

## Component Library

### Builder Interface Components

**1. Project Dashboard**
- Grid layout (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
- Project cards with thumbnail preview, hover lift effect (transform scale-105)
- "New Project" card with dashed border and plus icon
- Search bar with icon, subtle background (bg-slate-800/50)

**2. Editor Sidebar**
- **Sections Panel**: Accordion-style collapsible sections list
  - Drag handle icons, reorderable with smooth transitions
  - Section type icons (hero, stats, gallery, etc.)
  - Quick actions (duplicate, delete, hide)
  
- **Brand Kit Panel**: 
  - Logo upload zone with preview (150x150px thumbnail)
  - Color pickers with hex input, swatch display
  - Typography selector dropdowns

- **Media Library**: 
  - Grid of uploaded assets (grid-cols-3, gap-2)
  - Upload dropzone with drag-over highlight (border-dashed border-purple-500)

**3. Live Preview Canvas**
- Full-width viewport simulation
- Device frame toggles (desktop/tablet/mobile)
- Zoom controls (50%, 75%, 100%, 150%)
- Transparent checkerboard for sections being edited

**4. AI Assistant Chat**
- Fixed bottom panel with slide-up animation
- Message bubbles: User (right-aligned, bg-purple-600) vs AI (left-aligned, bg-slate-700)
- Input field: Auto-expanding textarea, attach button for media
- Typing indicator: Animated dots
- Suggested prompts as chips when empty

**5. Top Navigation Bar**
- Project name (editable inline with click)
- Breadcrumb trail: Projects > Shell Helix Campaign
- Action buttons: Preview, Export, Publish (gradient backgrounds)
- User menu: Avatar with dropdown

### Generated Page Components

**1. Hero Sections** (Multiple Variants)
- **Full-screen gradient hero**: h-screen with background gradient, centered content
- **Image overlay hero**: Background image with dark overlay (bg-black/60), white text
- **Split hero**: Two-column (60/40), image on one side, content on other
- Always include: Logo placement zone, headline, subheadline, CTA buttons

**2. Stats/KPI Dashboard**
- Grid layout (grid-cols-2 md:grid-cols-4)
- Each stat card: Large number (text-5xl font-bold), label below (text-sm)
- Subtle card backgrounds (bg-slate-800/30) with border
- Animated counter effect on scroll

**3. Product Showcase Cards**
- Card grid (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
- Image at top (aspect-video or aspect-square)
- Overlay on hover: darkens image, shows "View Details" button
- Product info: Title, price, description
- Tag system for categories (rounded-full badges)

**4. Video Section**
- Centered video player with custom controls
- Play button overlay (large, centered, with pulse animation)
- Optional caption below
- Background blur behind player for emphasis

**5. Image Gallery**
- Masonry layout (using CSS columns or grid)
- Lightbox modal on click (full-screen overlay)
- Captions on hover (slide up from bottom)

**6. Comparison Tables**
- Sticky header row
- Alternating row backgrounds (bg-slate-800/20)
- Checkmark/X icons for feature comparison
- Highlight column for recommended option (border-purple-500)

## Images

**Builder Interface**:
- Thumbnail previews in project cards (aspect-video, rounded-lg)
- Asset library thumbnails (square, 100x100px)
- Empty state illustrations for no projects (centered, subtle)

**Generated Pages**:
- **Hero Images**: Full-width, high-quality (1920x1080 recommended)
  - Gradient overlays for text readability
  - Parallax scroll effect optional
  
- **Product Images**: Consistent aspect ratios (1:1 or 16:9)
  - Lazy loading for performance
  - Hover zoom effect (scale-110 transition)

- **Background Patterns**: Subtle noise textures or geometric patterns
  - Low opacity (10-20%) for depth without distraction

## Animations & Interactions

**Builder Interface**:
- Sidebar expand/collapse: 300ms ease-in-out
- Panel transitions: Slide and fade (transform + opacity)
- Drag and drop: Smooth reordering with visual feedback
- Save indicator: Subtle pulse animation on auto-save
- Minimal motion: Respect prefers-reduced-motion

**Generated Pages**:
- Scroll-triggered fade-ins: Sections animate up 20px on enter viewport
- Button hovers: Slight lift (transform translateY(-2px)), shadow increase
- Card hovers: Scale-105, shadow-2xl transition
- Page transitions: Smooth scroll behavior
- Loading states: Skeleton screens with shimmer effect

## Accessibility & Polish

- Focus states: 2px purple ring (ring-2 ring-purple-500)
- Keyboard navigation: All interactive elements accessible
- ARIA labels on icon-only buttons
- Color contrast: WCAG AA minimum (4.5:1 for text)
- Dark mode optimized: All components readable in dark theme
- Error states: Red border + icon + descriptive text
- Success states: Green border + checkmark + confirmation message

## Export/Output Specifications

Generated pages should export as:
- Clean, semantic HTML5
- Inline critical CSS, external for rest
- Optimized images (WebP with fallbacks)
- Minified JavaScript for interactions
- SEO meta tags included (title, description, OG tags)
- Mobile-first responsive design
- Print stylesheet included