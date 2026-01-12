# Planning Guide

بنك الطعام العربي (Arabic Taste) is a comprehensive Arabic-only recipe platform showcasing traditional dishes from all Arab countries plus the top 5 international cuisines, presented entirely in right-to-left Arabic layout with detailed nutritional information and multi-level categorization.

**Experience Qualities**:
1. **Authentic** - The platform should feel genuinely Arabic with culturally appropriate design patterns, colors, and typography that resonate with Arab users
2. **Organized** - Users should easily navigate through hundreds of recipes using intuitive filtering by country, cuisine type, and meal category
3. **Informative** - Each recipe provides comprehensive details including ingredients, steps, timing, and complete nutritional breakdown to help users make informed cooking decisions

**Complexity Level**: Complex Application (advanced functionality, likely with multiple views)
This is a content-rich application with multiple interconnected features including recipe browsing, detailed recipe views, multi-faceted filtering/search, categorization systems, and comprehensive data management requiring sophisticated state handling.

## Essential Features

**Recipe Browsing Grid**
- Functionality: Display recipe cards in a responsive grid layout with thumbnail, title, cuisine, and key metrics
- Purpose: Allow users to quickly scan available recipes and identify ones of interest
- Trigger: Landing on homepage or selecting a category/filter
- Progression: User views grid → hovers/taps card for preview → clicks to view full recipe
- Success criteria: Grid adapts to screen sizes, loads quickly, shows clear visual hierarchy

**Recipe Detail View**
- Functionality: Full recipe page with ingredients list, step-by-step instructions, timing breakdown, nutritional facts, and metadata
- Purpose: Provide complete information needed to successfully prepare the dish
- Trigger: Clicking a recipe card from the grid
- Progression: User clicks recipe → modal/page opens → reads ingredients → follows steps → can return to browsing
- Success criteria: All information clearly organized, easy to read while cooking, smooth navigation back to grid

**Multi-Level Filtering System**
- Functionality: Filter recipes by country (22 Arab countries), cuisine type (traditional/international), meal type (breakfast/lunch/dinner/dessert), and difficulty level
- Purpose: Help users find exactly what they're looking for based on multiple criteria
- Trigger: User selects filter options from sidebar or filter menu
- Progression: User opens filters → selects one or more criteria → grid updates in real-time → user refines further or clears filters
- Success criteria: Filters work individually and in combination, results update instantly, active filters clearly displayed

**Search Functionality**
- Functionality: Real-time text search across recipe names and ingredients
- Purpose: Quick access to specific recipes or dishes containing certain ingredients
- Trigger: User types in search input field
- Progression: User types query → results filter in real-time → user continues typing or selects result
- Success criteria: Search is fast, works with Arabic text, highlights matches, handles partial words

**Category Navigation**
- Functionality: Browse recipes organized by Arab country (Egypt, Lebanon, Morocco, UAE, Saudi Arabia, etc.), international cuisine (Italian, Chinese, Indian, French, Japanese), or meal type
- Purpose: Explore recipes by cultural origin or meal occasion
- Trigger: Selecting category from navigation menu or category cards
- Progression: User clicks category → filtered view displays → user browses results → can apply additional filters
- Success criteria: Categories are visually distinct, easy to navigate, clear recipe counts

**Social Media Sharing**
- Functionality: Share recipe links directly to Facebook, Twitter, WhatsApp, Telegram, or copy link to clipboard
- Purpose: Enable users to share favorite recipes with friends and family through their preferred platform
- Trigger: Clicking the share button on recipe cards (on hover) or in recipe detail view
- Progression: User clicks share button → popover opens with platform options → user selects platform → share window opens or link copied → success confirmation shown
- Success criteria: Share URLs contain recipe title and description, all platforms open correctly, copy-to-clipboard works reliably, clear success feedback provided

## Edge Case Handling

- **No Search Results**: Display helpful message with suggestion to try different keywords or browse by category
- **Empty Filter Combination**: Show "no recipes match these filters" with quick clear filters button
- **Missing Recipe Data**: Gracefully handle missing nutritional info or images with placeholders and "information unavailable" labels
- **Long Recipe Names**: Truncate with ellipsis in cards, show full name in detail view
- **Very Long Ingredient Lists**: Use scroll container with visual indicator for more items
- **Mobile Touch Interactions**: Ensure filter panels slide smoothly, cards have adequate touch targets, recipe steps easy to read while cooking

## Design Direction

The design should evoke warmth, tradition, and culinary richness while maintaining modern usability. It should feel like a treasured family cookbook brought to digital life - welcoming, organized, and culturally authentic. The interface should celebrate Arabic typography and right-to-left flow as primary design elements rather than adaptations.

## Color Selection

A warm, earthy palette inspired by traditional Arabic spices and hospitality.

- **Primary Color**: oklch(0.45 0.15 35) - Deep Saffron/Turmeric Gold. Communicates warmth, tradition, and the golden hues of Arabic cuisine. Used for primary actions and key UI elements.
- **Secondary Colors**: 
  - oklch(0.35 0.08 25) - Rich Cinnamon Brown for headers and emphasis
  - oklch(0.92 0.02 85) - Warm Cream background suggesting parchment/traditional recipe cards
- **Accent Color**: oklch(0.55 0.18 145) - Mint Green inspired by fresh herbs. Used for success states, fresh ingredients tags, and call-to-action elements that need to pop.
- **Foreground/Background Pairings**: 
  - Primary (Deep Saffron oklch(0.45 0.15 35)): White text oklch(0.98 0 0) - Ratio 7.2:1 ✓
  - Secondary (Rich Cinnamon oklch(0.35 0.08 25)): Warm Cream text oklch(0.92 0.02 85) - Ratio 8.5:1 ✓
  - Accent (Mint Green oklch(0.55 0.18 145)): Dark text oklch(0.25 0.05 25) - Ratio 5.8:1 ✓
  - Background (Warm Cream oklch(0.92 0.02 85)): Primary text oklch(0.2 0.02 25) - Ratio 11.2:1 ✓

## Font Selection

Typography should celebrate Arabic script with a font that is both traditional and highly readable, paired with clear hierarchy that works beautifully in RTL layout.

- **Typographic Hierarchy**: 
  - H1 (Page Title): Tajawal Bold/36px/tight (-0.02em) - Main section headers
  - H2 (Recipe Name): Tajawal SemiBold/28px/normal - Recipe titles in detail view
  - H3 (Section Headers): Tajawal Medium/22px/normal - "المقادير", "طريقة التحضير" sections
  - Body (Ingredients/Steps): Tajawal Regular/16px/relaxed (1.6) - Main content text
  - Small (Metadata): Tajawal Regular/14px/normal - Time, difficulty, nutrition labels
  - Caption (Tags): Tajawal Medium/13px/wide (0.01em) - Category and cuisine tags

## Animations

Animations should feel organic and purposeful, like flipping through a cookbook or ingredients being added to a dish. Subtle motion enhances the browsing experience without distracting from the content.

- **Card Hover**: Gentle lift with shadow increase (150ms ease-out) - makes recipes feel tangible
- **Filter Apply**: Smooth fade-in of results (300ms) with slight scale animation - confirms action
- **Modal Open**: Recipe detail slides up from bottom on mobile, fades with scale on desktop (350ms ease-out)
- **Search Results**: Staggered fade-in of matching cards (50ms delay between each) - feels responsive and alive
- **Navigation**: Smooth scroll to sections, slide-in of filter panel from right (250ms)
- **Success States**: Subtle bounce on checkmarks and confirmations (200ms)

## Component Selection

- **Components**: 
  - Card: Recipe thumbnails with hover states, title, metadata overlay
  - Dialog: Full recipe detail view with scrollable content sections
  - Input: Search field with Arabic placeholder and clear button
  - Select: Dropdown filters for categories (with shadcn Select component)
  - Badge: Cuisine tags, difficulty levels, dietary info with color coding
  - Separator: Dividing sections within recipe details
  - Button: Primary actions (view recipe), filter chips (clear, apply)
  - Scroll-area: Long ingredient lists and step-by-step instructions
  - Tabs: Switching between "جميع الوصفات", "عربي", "عالمي" views
  - Sheet: Mobile filter panel sliding from right side
  
- **Customizations**: 
  - Custom recipe card component with image, gradient overlay, and metadata grid
  - Custom nutrition facts table component styled like traditional food labels
  - Custom time indicator component with icons for prep/cook/total time
  - RTL-optimized layout wrapper ensuring all components flow right-to-left
  
- **States**: 
  - Recipe cards: Default, hover (lift + shadow), active (pressed), loading (skeleton)
  - Filter chips: Default, selected (accent background), hover
  - Search input: Default, focused (accent border), filled, cleared
  - Buttons: Default, hover (darken), active, disabled (muted)
  
- **Icon Selection**: 
  - Timer/Clock for preparation times
  - ChefHat for difficulty level
  - ForkKnife for serving size
  - Flame for calories
  - MapPin for country/region
  - MagnifyingGlass for search
  - FunnelSimple for filters
  - X for clear/close actions
  
- **Spacing**: 
  - Page padding: px-6 md:px-12 lg:px-24
  - Grid gap: gap-6 md:gap-8
  - Card padding: p-4 md:p-6
  - Section spacing: space-y-8 md:space-y-12
  - Component internal spacing: gap-3 for tight groups, gap-4 for comfortable spacing
  
- **Mobile**: 
  - Stack filter sidebar vertically in Sheet component accessible via hamburger menu
  - Recipe cards adapt from 3-4 columns to 1-2 columns on mobile
  - Recipe detail view becomes full-screen modal on mobile
  - Nutrition facts table stacks vertically on small screens
  - Search bar becomes prominent header element on mobile
  - Category navigation becomes horizontal scrollable carousel on mobile
