# Sports Match Management Application - Design Guidelines

## Design Approach
**Selected Approach:** Design System Foundation (Material Design) with Sports App Aesthetics

**Justification:** This is a utility-focused management tool requiring efficiency and learnability. Drawing inspiration from sports platforms like ESPN and Strava for visual energy while maintaining Material Design's structured form patterns.

**Key Principles:**
- Clarity and speed in match creation workflows
- Strong visual hierarchy for form sections
- Data-forward presentation with athletic energy
- Scannable layouts for quick information processing

## Typography
**Font Stack (via Google Fonts CDN):**
- Primary: Inter (400, 500, 600, 700) - UI elements and forms
- Accent: Outfit (600, 700, 800) - Headings and statistics

**Hierarchy:**
- Hero Headlines: 48-64px, Outfit Bold
- Page Titles: 32-36px, Outfit Semibold
- Section Headers: 24px, Outfit Semibold
- Form Labels: 14px, Inter Medium
- Input Text: 16px, Inter Regular
- Body Text: 16px, Inter Regular
- Helper Text: 14px, Inter Regular

## Layout System
**Spacing Units:** Tailwind units of 2, 4, 6, 8, 12, 16 (e.g., p-4, gap-6, mb-8)

**Container Strategy:**
- Hero: Full-width with overlay content max-w-6xl centered
- Form Sections: max-w-3xl centered for optimal readability
- Dashboard Grids: max-w-7xl with responsive columns

**Vertical Rhythm:** py-12 mobile, py-16 desktop for major sections

## Component Library

### Navigation
Top nav bar with logo left, primary actions right (Create Match, Matches, Profile). Sticky on scroll.

### Hero Section
Full-width image banner (h-96) with gradient overlay. Centered content includes primary headline, subheading, and CTA button with backdrop blur background.

### New Match Creation Form
**Structure:** Single-column form (max-w-3xl) with clear visual sections

**Form Sections:**
1. **Match Details** (first section)
   - Match Title (text input, required)
   - Date & Time (date/time pickers, inline on desktop)
   - Sport Type (dropdown select)

2. **Team Information** (second section, prominently separated)
   - Team Name (text input) - **NEW FIELD, positioned first**
   - Player Name (text input) - positioned immediately below Team Name
   - Add Player button (secondary style)
   - Player list display (chips/tags with remove option)

3. **Match Settings** (third section)
   - Location (text input with map icon)
   - Duration (number input with unit selector)
   - Visibility (radio buttons: Public/Private)

**Form Input Styling:**
- All inputs full-width within container
- Label above input (mb-2)
- Input height: h-12
- Rounded corners: rounded-lg
- Border states for default/focus/error
- Helper text below inputs when needed

**Section Separators:** Use pb-8 mb-8 with subtle divider lines between major form sections

### Buttons
- Primary CTA: Medium size (h-12), rounded-lg, prominent
- Secondary: Ghost style with border
- Text buttons: For tertiary actions
- Buttons on images: backdrop-blur-md background treatment

### Cards
Match cards in dashboard with:
- Sport icon top-left
- Match title and time
- Team names with vs. separator
- Player count indicator
- Quick action buttons footer

## Images

**Hero Image:**
- Full-width sports action photograph (1920x800px recommended)
- Dynamic sports moment (players in action, stadium atmosphere, team celebration)
- Apply gradient overlay (dark to transparent, top to bottom)
- Placement: Top of application, spanning full viewport width

**Card Thumbnails:**
- Small sport-specific icons (48x48px) for match type identification
- Position: Top-left corner of each match card

**Image Style:** High-energy sports photography with strong composition and movement