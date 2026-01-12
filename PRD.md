# Planning Guide

بنك الطعام العربي (Arabic Taste) is a comprehensive Arabic-only recipe platform showcasing traditional dishes from all Arab countries plus the top 5 international cuisines, presented entirely in right-to-left Arabic layout with detailed nutritional information and multi-level categorization.

**Experience Qualities**:
1. **Authentic** - The platform should feel genuinely Arabic with culturally appropriate design patterns, colors, and typography that resonate with Arab users
2. **Organized** - Users should easily navigate through hundreds of recipes using intuitive filtering by country, cuisine type, and meal category
3. **Informative** - Each recipe provides comprehensive details including ingredients, steps, timing, and complete nutritional breakdown to help users make informed cooking decisions

**Complexity Level**: Complex Application (advanced functionality, likely with multiple views)
This is a social recipe platform with user authentication, profiles, interactive features (reviews, ratings, photo uploads), recipe browsing, detailed recipe views, multi-faceted filtering/search, categorization systems, and comprehensive data management requiring sophisticated state handling.

## Essential Features

**User Authentication with Google**
- Functionality: Users can sign in using their Google/Gmail account to access social features
- Purpose: Enable personalized experience, user-generated content ownership, and social interactions
- Trigger: Clicking "تسجيل الدخول" button in header or when attempting to access protected features
- Progression: User clicks login → Google OAuth popup opens → user authorizes → popup closes → user redirected back logged in → profile loaded
- Success criteria: Seamless OAuth flow, user data persisted, logged-in state maintained across sessions, clear visual indication of logged-in status

**User Profile Management**
- Functionality: Display user's profile with avatar, name, bio, recipe contributions, reviews written, and photos uploaded
- Purpose: Create sense of community and identity within the platform
- Trigger: Clicking user avatar in header or viewing own contributions
- Progression: User navigates to profile → sees activity summary → can edit bio → view all contributions → track engagement metrics
- Success criteria: Profile shows accurate data, avatar from Google account, contributions are linked and accessible

**Social Feed / Activity Stream**
- Functionality: Timeline showing recent activity from the community (new recipes, reviews, photos, ratings)
- Purpose: Create engaging social experience and discover community content
- Trigger: Landing on homepage or clicking "الصفحة الرئيسية" in navigation
- Progression: User views feed → sees recent activities → can interact (like, comment) → click to view full content → return to feed
- Success criteria: Feed updates with new content, shows diverse activity types, infinite scroll or pagination works smoothly

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

**Recipe Reviews and Ratings System**
- Functionality: Users can rate recipes (1-5 stars) and leave written reviews with comments about their cooking experience
- Purpose: Build community engagement, provide social proof, and help users choose recipes based on others' experiences
- Trigger: Clicking on a recipe to view details, then navigating to the reviews tab
- Progression: User views recipe → switches to reviews tab → sees rating overview and distribution → reads existing reviews → adds their own rating and comment → review posted with success confirmation → can like/unlike other reviews → can delete their own review
- Success criteria: Rating system accurately calculates and displays average ratings, reviews are sorted by various criteria (newest, highest rated, most liked), review form validates input, users can only review each recipe once, rating distribution chart clearly visualizes all ratings

**User Photo Upload for Recipes**
- Functionality: Users can upload photos of their completed dishes after trying a recipe, with optional captions describing their experience
- Purpose: Build visual community engagement, inspire confidence in recipes through real user results, and create authentic social proof
- Trigger: Clicking on a recipe detail view, then navigating to the "صور المستخدمين" tab
- Progression: User views recipe → switches to photos tab → sees upload form → selects image file from device → previews image → adds optional caption → uploads photo → photo appears in gallery immediately → can view all photos in grid → click for fullscreen view → can like others' photos → can delete their own photos
- Success criteria: Image upload supports common formats (JPG, PNG), validates file size (max 5MB), stores images as base64 data URLs, displays in responsive grid, fullscreen dialog shows high quality version, like/unlike functionality works, users can only delete their own photos, photos persist across sessions

## Edge Case Handling

- **User Not Authenticated**: Show limited view with login prompt for social features, allow browsing recipes without login
- **Google OAuth Failure**: Display clear error message with retry option if OAuth flow fails or is cancelled
- **Expired Session**: Automatically refresh token or prompt re-login with seamless UX
- **Network Offline**: Show cached content where possible, clear indicators when features require connection
- **No Search Results**: Display helpful message with suggestion to try different keywords or browse by category
- **Empty Filter Combination**: Show "no recipes match these filters" with quick clear filters button
- **Missing Recipe Data**: Gracefully handle missing nutritional info or images with placeholders and "information unavailable" labels
- **Long Recipe Names**: Truncate with ellipsis in cards, show full name in detail view
- **Very Long Ingredient Lists**: Use scroll container with visual indicator for more items
- **Mobile Touch Interactions**: Ensure filter panels slide smoothly, cards have adequate touch targets, recipe steps easy to read while cooking
- **No Reviews Yet**: Display inviting empty state encouraging users to be the first to review
- **Duplicate Reviews**: Prevent users from submitting multiple reviews for the same recipe
- **User Not Logged In**: Show reviews but disable rating/commenting functionality with clear login prompt
- **No Photos Yet**: Display inviting empty state with upload prompt encouraging users to share their cooking results
- **Large Image Files**: Validate file size before upload and show clear error message if exceeds 5MB limit
- **Invalid File Types**: Only accept image files and show error for other file types
- **Photo Upload Failure**: Show clear error message and allow retry if upload fails
- **Empty Feed**: Show welcome message for new users with suggestions to explore recipes

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
  - Dialog: Full recipe detail view with scrollable content sections, photo fullscreen viewer
  - Input: Search field with Arabic placeholder and clear button, file input for photo uploads
  - Select: Dropdown filters for categories (with shadcn Select component)
  - Badge: Cuisine tags, difficulty levels, dietary info with color coding
  - Separator: Dividing sections within recipe details
  - Button: Primary actions (view recipe), filter chips (clear, apply), photo upload
  - Scroll-area: Long ingredient lists and step-by-step instructions
  - Tabs: Switching between recipe details, reviews, and user photos sections
  - Sheet: Mobile filter panel sliding from right side
  - Avatar: User profile pictures in review cards and photo cards
  - Textarea: Multi-line review comment input and photo caption input
  - Progress: Visual rating distribution bars showing percentage of each star rating
  - Label: Form labels for photo upload caption field
  
- **Customizations**: 
  - Custom recipe card component with image, gradient overlay, metadata grid, and rating stars
  - Custom nutrition facts table component styled like traditional food labels
  - Custom time indicator component with icons for prep/cook/total time
  - Custom rating stars component with interactive (clickable) and display-only modes
  - Custom review card with user info, timestamp, rating, comment, and like functionality
  - Custom rating overview with average score, total count, and distribution chart
  - Custom photo upload form with drag-and-drop area, preview, and caption input
  - Custom photo card component showing user info, image, caption, and like button
  - Custom photo gallery grid with responsive columns and fullscreen viewer
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
  - Star for ratings (filled, outlined, and half states)
  - ChatCircleDots for reviews/comments section
  - ThumbsUp for liking reviews
  - PaperPlaneRight for submitting reviews
  - Trash for deleting reviews and photos
  - SortAscending for review sorting options
  - Image for photo gallery and upload sections
  - Upload for photo upload call-to-action
  - Heart for liking user photos
  
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
