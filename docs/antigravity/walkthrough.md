# Modal Minimization & Dropdown Dismissal Fixes

This walkthrough covers the implementation of minimize buttons for primary modals and an automated dismissal mechanism for search dropdowns.

## Changes Made

### Modal Minimization
Implemented minimization functionality for the "Create New Invoice" and "New Job Card" modals to allow users to temporarily hide the modal without losing progress.

- **Billing Page (`src/app/billing/page.js`)**:
  - Added `isInvoiceMinimized` state.
  - Added a minimize button (—) to the modal header.
  - Styled the minimized state as a persistent bar at the bottom-right of the screen.
  - Fixed syntax errors (missing closing tags/parentheses) introduced during implementation.

- **Job Cards Page (`src/app/job-cards/page.js`)**:
  - Added `isJobCardMinimized` state.
  - Added a minimize button (—) to the modal header.
  - Implemented the same collapsible UI pattern as the Billing page.

### Dropdown Dismissal
Fixed an issue where search dropdowns in the Job Cards page would remain open even when clicking outside of them.

- **Job Cards Page (`src/app/job-cards/page.js`)**:
  - Added `customerSearchRef` and utilized existing `customerVoiceRef` and `advisorVoiceRef`.
  - Implemented a `useEffect` hook with a global `mousedown` listener to detect clicks outside these containers.
  - Automatically closes the Customer Search, Customer Voice, and Advisor Voice dropdowns on outside clicks.

### Staff Sorting
Implemented sorting functionality for the Staff Master list in the HR module.

- **HR Page (`src/app/hr/page.js`)**:
  - Added `sortConfig` state to track sort column and direction.
  - Implemented reactive sorting logic using `useMemo` for staff data.
  - Enabled interactive sorting by clicking on "Staff" (Name) and "Role" column headers.
  - Added visual indicators (🔼/🔽) to represent the current sort state.

### Persistent Minimized Tasks
Fixed an issue where minimized modals (Job Cards and Invoices) would disappear when navigating between pages.

- **Global Context (`src/context/PersistentTaskContext.js`)**:
  - Implemented a registry for active/minimized tasks persisted in `localStorage`.
- **Global UI (`src/components/GlobalMinimizedBar.js`)**:
  - Created a floating bar that displays all minimized tasks globally.
  - Clicking a task restores it and navigates back to the correct page.
- **Integration**:
  - Injected `PersistentTaskProvider` into `ClientLayout.js`.
  - Refactored `JobCardsPage` and `BillingPage` to sync modal state with the global registry.

### Mode and Accent Color Settings
Fixed an issue where the Dark Mode and Accent Color buttons in the Settings page were non-functional.

- **Theme Context (`src/context/ThemeContext.js`)**:
  - Created a global context to manage `theme` (Light/Dark) and `accentColor` state.
  - Persists settings in `localStorage` for cross-session consistency.
  - Automatically applies classes and CSS variables to the root document element.
- **Global Styles (`src/app/globals.css`)**:
  - Implemented `.dark-theme` class with comprehensive variable overrides for backgrounds, text, and components.
- **Settings Page (`src/app/settings/page.js`)**:
  - Connected UI controls to the global `ThemeContext`.
  - Added click handlers to allow users to change the brand accent color instantly across the entire application.

### Unit Field in Inventory
Added a new "Unit" master data category and integrated it with the Inventory spare parts system.

- **Model (`src/models/Unit.js`)**: Created schema with `name` and `abbreviation` fields.
- **API (`src/app/api/units/route.js`)**: GET/POST endpoint with auto-seeding of default units (Nos, lts, ml, Kg, gm).
- **SparePart Model**: Added `unit` field (default: "Nos").
- **Settings Page**: Added "Units" to master data categories for management.
- **Inventory Page**: Added Unit dropdown to the Add/Edit Spare Part modal.

## Verification

### Modal Minimization
- Verified code structure and styling for the minimize button and collapsed state.
- Ensured the "Expand" functionality works by toggling the `isMinimized` state.

### Dropdown Dismissal
- Verified that `setShowCustomerSearchDropdown(false)`, `setShowCustomerVoiceDropdown(false)`, and `setShowAdvisorVoiceDropdown(false)` are correctly called based on ref boundary checks.
- Confirmed refs are attached to the correct wrapper elements in the JSX.

### Staff Sorting
- Verified that clicking the "Staff" and "Role" headers toggles the sorting direction.
- Confirmed the list re-orders correctly based on Name (A-Z/Z-A) and Role.

### Persistent Minimized Tasks
- Verified that the `PersistentTaskProvider` correctly wraps the application.
- Confirmed that minimizing a Job Card adds it to the global bar and persists after page refresh/navigation.
- Confirmed that clicking a task in the global bar navigates to the correct page and restores the modal state.
- Verified that closing the modal (X) removes the task from the global bar and `localStorage`.

### Mode and Accent Color Settings
- Verified through code inspection that `ThemeContext` correctly manipulates the `documentElement`.
- Confirmed that `globals.css` now contains appropriate dark mode variable overrides.
- Confirmed that accent color buttons in `SettingsPage` trigger the `changeAccentColor` method.
- Verified that settings are persisted in `localStorage`.

render_diffs(file:///c:/Users/user/Desktop/S2_Motorz_CRM/src/app/billing/page.js)
render_diffs(file:///c:/Users/user/Desktop/S2_Motorz_CRM/src/app/job-cards/page.js)
render_diffs(file:///c:/Users/user/Desktop/S2_Motorz_CRM/src/app/hr/page.js)
render_diffs(file:///c:/Users/user/Desktop/S2_Motorz_CRM/src/components/ClientLayout.js)
render_diffs(file:///c:/Users/user/Desktop/S2_Motorz_CRM/src/context/PersistentTaskContext.js)
render_diffs(file:///c:/Users/user/Desktop/S2_Motorz_CRM/src/components/GlobalMinimizedBar.js)
render_diffs(file:///c:/Users/user/Desktop/S2_Motorz_CRM/src/context/ThemeContext.js)
render_diffs(file:///c:/Users/user/Desktop/S2_Motorz_CRM/src/app/globals.css)
render_diffs(file:///c:/Users/user/Desktop/S2_Motorz_CRM/src/app/settings/page.js)
