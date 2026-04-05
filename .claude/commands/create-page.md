# Create New Page

**IMPORTANT:** Follow ALL rules below when creating a new page. Check each item before finishing.

## Steps

### 1. Create the page directory
```
src/pages/<feature>/
├── index.tsx           ← barrel export ONLY
├── <Feature>Page.tsx   ← actual page component
└── hooks/
    └── use<Feature>Page.ts  ← page logic hook
```

### 2. Create the page hook (`hooks/use<Feature>Page.ts`)
All logic goes here — NO `useEffect`, `useState`, `useMemo`, `useCallback` in the page component itself.

```tsx
import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { usePageTitle } from "@/hooks";

export function use<Feature>Page() {
  usePageTitle("<Feature>");
  const { t } = useTranslation();

  // All state, effects, handlers here
  return { /* expose only what the page JSX needs */ };
}
```

**Rules for hooks:**
- Separate API hooks from page hooks: `useFeatureApi.ts` for RTK Query calls, `useFeaturePage.ts` for UI orchestration
- API hooks call RTK Query, handle errors with `errorHandler()`, return data + loading states
- Page hooks compose API hooks + UI state, return props for the page component
- Use `useAuth()` from `@/hooks` for auth — never raw dispatch
- Use `useNotification()` from `@/hooks` for toasts

### 3. Create the page component (`<Feature>Page.tsx`)
```tsx
import { use<Feature>Page } from "./hooks/use<Feature>Page";

const <Feature>Page = () => {
  const { ... } = use<Feature>Page();

  return (
    // JSX only — no logic, no effects
  );
};

export default <Feature>Page;
```

**Rules for page components:**
- ZERO `useEffect`, `useState`, `useMemo`, `useCallback` — all in hooks
- Only imports: the page hook, child components, Mantine layout components
- Use Mantine components: `Stack`, `Group`, `SimpleGrid`, `Container`, `Paper`, `Text`, `Title`
- Use `<Button loading={isLoading}>` for submit actions
- Use `<Skeleton>` for loading states

### 4. Create the barrel (`index.tsx`)
```tsx
export { default } from "./<Feature>Page";
// Re-export any constants
export { featureRouteName } from "./<Feature>Page";
```

**CRITICAL:** `index.tsx` must ONLY contain re-exports. No components, no logic, no imports from React.

### 5. Add the route
In `src/routes/routes.tsx`:

```tsx
// Add lazy import
const FeaturePage = lazy(
  () => import("@/pages/<feature>")
);

// Add route constant
export const FEATURE_ROUTES = {
  root: "/feature",
} as const;

// Add to protectedRoutesAdmin or publicRoutes
{ path: "feature", element: <FeaturePage /> },
```

**Route rules:**
- All pages are lazy-loaded with `React.lazy()`
- Child routes use RELATIVE paths (never absolute like `/feature` under a parent)
- Add route constants — no hardcoded path strings in components

### 6. Add translations
Create `src/locales/en/<feature>/index.ts`:
```ts
export default {
  title: "Feature Title",
  // ...keys
} as const;
```

Then run `make i18n` to auto-generate barrel files and create the ID stub.

### 7. Add sidebar entry (if dashboard page)
In `src/data/menu/index.tsx`, add:
```tsx
{ name: "Feature", path: "/dashboard/feature", icon: SomeIcon }
```

## Validation Checklist
- [ ] `index.tsx` is barrel-only (no React imports)
- [ ] Page component has ZERO hooks/effects (all in `hooks/`)
- [ ] Hooks separated: API hook vs page hook
- [ ] `usePageTitle()` called in page hook
- [ ] Route is lazy-loaded
- [ ] Route path is relative (not absolute under parent)
- [ ] Route constant exported from `routes.tsx`
- [ ] Translations added + `make i18n` run
- [ ] Validation uses Zod (NOT Yup)
- [ ] Forms use `react-hook-form` + `zodResolver`
- [ ] Errors handled with `errorHandler()` from `@/_services/errorHandler`
- [ ] Notifications use `useNotification()` from `@/hooks`
- [ ] Input styles come from theme — no inline `styles` on Mantine inputs
- [ ] Lines max 80 chars (enforced by Prettier)
