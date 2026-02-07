# Theme and Accent Color Fix

Fix the issue where Dark mode and Accent color buttons on the settings page are not working properly.

## Proposed Changes

### Global Styles
#### [MODIFY] [globals.css](file:///c:/Users/user/Desktop/S2_Motorz_CRM/src/app/globals.css)
- Add a `.dark-theme` class that overrides light mode variables with dark mode ones.
- Ensure primary color variables are set via CSS variables that can be overridden.

### Theme Context
#### [NEW] [ThemeContext.js](file:///c:/Users/user/Desktop/S2_Motorz_CRM/src/context/ThemeContext.js)
- Create a new context to manage `theme` (light/dark) and `accentColor`.
- Persist these settings in `localStorage`.
- Apply the theme class and accent color CSS variables to the root element.

### Layout Integration
#### [MODIFY] [ClientLayout.js](file:///c:/Users/user/Desktop/S2_Motorz_CRM/src/components/ClientLayout.js)
- Wrap the application with `ThemeProvider`.

### Settings Page
#### [MODIFY] [page.js](file:///c:/Users/user/Desktop/S2_Motorz_CRM/src/app/settings/page.js)
- Integrate `useTheme` context.
- Add `onClick` handlers to accent color circles.
- Update Dark Mode toggle buttons to use the context.

## Verification Plan
### Manual Verification
- Go to Settings > Appearance.
- Toggle between Light and Dark mode; verify the UI changes immediately.
- Click various accent colors; verify the primary brand color (buttons, icons, etc.) updates across the app.
- Refresh the page; verify settings persist.
