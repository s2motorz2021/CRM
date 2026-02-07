# Staff List Sorting Implementation

The goal is to add sorting functionality to the Staff Master list on the HR page, specifically for the "Staff" (name) and "Role" columns.

## Proposed Changes

### HR Page (`src/app/hr/page.js`)

- **State Management**:
  - Add `sortConfig` state to track the current sorting column and order.
    ```javascript
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
    ```

- **Sorting Logic**:
  - Implement a `requestSort` function to update the `sortConfig`.
  - Implement a `sortedStaff` computed array using `useMemo` or a function call within the render.
    ```javascript
    const sortedStaff = [...staff].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });
    ```

- **UI Updates**:
  - Update the `<thead>` of the Staff Master table (starting around line 504).
  - Add `onClick` handlers to "Staff" and "Role" headers to trigger `requestSort`.
  - Add visual indicators (e.g., arrows 🔼/🔽) to show the current sort state.
  - Update the `staff.map` call to use `sortedStaff.map`.

## Verification Plan

### Manual Verification
- Navigate to the HR page and ensure "Staff Master" tab is active.
- Click on the "Staff" header.
  - Verify that staff members are sorted alphabetically by name.
  - Click again and verify the sorting order reverses (Z-A).
- Click on the "Role" header.
  - Verify that staff members are sorted by their roles.
  - Click again and verify the sorting order reverses.
- Ensure the branch, contact, and status columns still display the correct data for each staff member after sorting.
