# Add Unit Field to Inventory

Add a new "Unit" master data category (Nos, lts, ml, Kg, gm) and integrate it with the Inventory spare parts system.

## Proposed Changes

### Database Model
#### [NEW] [Unit.js](file:///c:/Users/user/Desktop/S2_Motorz_CRM/src/models/Unit.js)
- Create a new Mongoose model for units with fields: `name` (e.g., "Numbers"), `abbreviation` (e.g., "Nos"), and `isActive`.

#### [MODIFY] [SparePart.js](file:///c:/Users/user/Desktop/S2_Motorz_CRM/src/models/SparePart.js)
- Add `unit` field (String, default: "Nos").

---

### API Endpoint
#### [NEW] [route.js](file:///c:/Users/user/Desktop/S2_Motorz_CRM/src/app/api/units/route.js)
- Standard GET/POST endpoint for fetching and creating/updating units.

---

### Master Data Configuration
#### [MODIFY] [page.js](file:///c:/Users/user/Desktop/S2_Motorz_CRM/src/app/settings/page.js)
- Add "Units" to `masterCategories` array with fields: `name`, `abbreviation`.

---

### Inventory Integration
#### [MODIFY] [page.js](file:///c:/Users/user/Desktop/S2_Motorz_CRM/src/app/inventory/page.js)
- Add `units` state.
- Fetch units from `/api/units` on load.
- Add `unit` field to `partForm`.
- Add Unit dropdown in the "Add New Spare Part" modal after "Current Stock".

---

### Seed Data
- Pre-populate with default units: Numbers (Nos), Liter (lts), Milli Liter (ml), Kilogram (Kg), Grams (gm).

## Verification Plan
### Manual Verification
- Settings > Master Data > Units: Add/edit custom units.
- Inventory > Stock List > Add New Part: Verify Unit dropdown populates correctly.
- Save a part with a unit and verify it persists on reload.
