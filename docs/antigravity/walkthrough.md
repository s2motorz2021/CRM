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

render_diffs(file:///c:/Users/user/Desktop/S2_Motorz_CRM/src/app/billing/page.js)
render_diffs(file:///c:/Users/user/Desktop/S2_Motorz_CRM/src/app/job-cards/page.js)
render_diffs(file:///c:/Users/user/Desktop/S2_Motorz_CRM/src/app/hr/page.js)
