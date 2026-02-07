# Persistent Minimized Tasks Implementation Plan

The objective is to ensure that minimized modals (like Job Cards or Invoices) persist even when the user navigates to other pages. When a user clicks the persistent minimized bar, they should be taken back to the respective page with the modal restored to its exact state.

## Proposed Changes

### 1. New Context: `src/context/PersistentTaskContext.js` [NEW]
- Create a context to manage a registry of active/minimized tasks.
- Each task object will contain:
  - `id`: Unique identifier (e.g., job card number or 'new-invoice').
  - `type`: 'jobcard' or 'invoice'.
  - `title`: Display name.
  - `data`: The full `formData` and related state.
  - `activePage`: The route to navigate to (e.g., `/job-cards`).
- Persist this registry in `localStorage`.

### 2. Layout Integration: `src/components/ClientLayout.js`
- Wrap the application with `PersistentTaskProvider`.
- Add a floating UI container at the bottom-right for global minimized tasks.

### 3. Global UI: `src/components/GlobalMinimizedBar.js` [NEW]
- A component that renders the list of minimized tasks from `PersistentTaskContext`.
- Clicking a task will:
  - Navigate to the `activePage`.
  - The page will then detect the active task and restore the modal.

### 4. Job Cards Page: `src/app/job-cards/page.js`
- On mount: Check if there's a persistent task of type 'jobcard'.
- If found: Restore `editingJobCard`, `formData`, and `activeTab`. Open the modal.
- On Minimize: Sync current state to `PersistentTaskContext`.
- On Close (X): Remove task from `PersistentTaskContext`.

### 5. Billing Page: `src/app/billing/page.js`
- Similar logic for the "Create Invoice" modal.

## Verification Plan

### Manual Verification
1.  Open "New Job Card" and fill in some details.
2.  Minimize the Job Card.
3.  Navigate to "Billing" or "HR".
4.  Verify the minimized bar is still visible at the bottom-right.
5.  Click the minimized bar.
6.  Verify you are taken back to the "Job Cards" page and the modal is open with the previously filled details.
7.  Repeat for the "Create Invoice" modal.
8.  Verify that closing the modal (X) removes it from the persistent bar.
