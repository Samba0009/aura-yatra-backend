# Implementation Plan - Dynamic State Management & Mock Data

This plan aims to transform the AuraYatra frontend from a static prototype into a functional interactive application by implementing global state management and centralized data.

## Proposed Changes

### Core Infrastructure

#### [NEW] [BookingContext.jsx](file:///C:/Users/jchow/Downloads/AuraYatra-main/AuraYatra-main/src/context/BookingContext.jsx)
- Create a React Context to manage:
    - `searchQuery`: { from, to, startDate, endDate, travellers }
    - `guidePreferences`: { travellers, terrain, duration, budget }
    - `selection`: { type, item } (e.g., temple or curated plan)
    - `travellersDetails`: Array of traveller info

#### [NEW] [mockData.js](file:///C:/Users/jchow/Downloads/AuraYatra-main/AuraYatra-main/src/data/mockData.js)
- Consolidate all hardcoded data:
    - `TEMPLES`: List of sacred sites with location, description, and images.
    - `PLANS`: List of curated yatra plans.
    - `BLOGS`: List of blog posts.

#### [App.jsx](file:///C:/Users/jchow/Downloads/AuraYatra-main/AuraYatra-main/src/App.jsx)
- Wrap `AppContent` with `BookingProvider`.

---

### Screen Enhancements

#### [TempleSearch.jsx](file:///C:/Users/jchow/Downloads/AuraYatra-main/AuraYatra-main/src/screens/TempleSearch.jsx)
- Connect inputs to `BookingContext`.
- Update `Find My Yatra` button to save state before navigating.

#### [TempleResults.jsx](file:///C:/Users/jchow/Downloads/AuraYatra-main/AuraYatra-main/src/screens/TempleResults.jsx)
- Fetch results from `TEMPLES` based on search query.
- Update `Book Darshan` to save selected temple to context and navigate to review.

#### [GuideMyYatra.jsx](file:///C:/Users/jchow/Downloads/AuraYatra-main/AuraYatra-main/src/screens/GuideMyYatra.jsx)
- Save preferences to `BookingContext`.

#### [ReviewBooking.jsx](file:///C:/Users/jchow/Downloads/AuraYatra-main/AuraYatra-main/src/screens/ReviewBooking.jsx)
- Populate summary details dynamically from `BookingContext`.

---

## Verification Plan

### Automated Tests
- No unit test suite exists yet. Verification will be manual via UI inspection.

### Manual Verification
1. **Search Flow**:
   - Go to "Temple Search".
   - Enter a destination (e.g., "Kashi") and change travellers.
   - Click "Find My Yatra".
   - Verify header in "Temple Results" shows "Kashi" and updated traveller count.
2. **Booking Flow**:
   - In "Temple Results", click "Book Darshan" on a temple.
   - Verify "Review Booking" shows the correct temple name, dates, and traveller count.
3. **Guide Flow**:
   - Go to "Guide My Yatra".
   - Select "Snowy" terrain and "Premium" budget.
   - Click "Curate My Yatra".
   - Verify "Curated Plans" reflects these preferences (logic to be implemented).
