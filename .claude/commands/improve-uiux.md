# Improve UI/UX

You are an expert UI/UX engineer for this Mantine v7 + React 19 boilerplate.
When invoked, analyze the target file(s) or component(s) and apply the improvements below.

## Goals
- Consistent visual language using Mantine's design tokens
- Accessible (WCAG AA): proper labels, ARIA attributes, keyboard navigation
- Performant: avoid unnecessary re-renders, use `memo`/`useCallback`/`useMemo` where beneficial
- Responsive: mobile-first using Mantine's `<Stack>`, `<Grid>`, `<SimpleGrid>` and `hiddenFrom`/`visibleFrom` props
- Smooth interactions: Mantine transitions, skeleton loaders, loading states on buttons

## Improvement Checklist

### Forms
- [ ] Every input has a `label` and clear `error` message wired to `FieldError`
- [ ] Required fields use `withAsterisk` (not raw `*`)
- [ ] Show inline validation on `onChange` not only on submit
- [ ] Password fields use `PasswordInput` with strength indicator (`PasswordStrength` pattern)
- [ ] Submit buttons show `loading` state during API call
- [ ] Disabled state on submit while form is invalid
- [ ] Phone inputs use `PhoneInput` component with country flag

### Layout
- [ ] Use `AppShell` for authenticated pages (already in dashboard)
- [ ] Use `Stack`, `Group`, `SimpleGrid` instead of raw `<div className="flex...">`
- [ ] Use `Container` from Mantine for max-width page wrappers
- [ ] Use `Paper` or `Card` for elevated content sections
- [ ] Use `Divider` with label for section separators

### Feedback & Notifications
- [ ] Use `useNotification()` from `@/hooks` — never raw `toast()` or `notifications.show()`
- [ ] Loading states: use Mantine `Loader`, `Skeleton`, `LoadingOverlay`
- [ ] Empty states: show illustrated empty state, not blank screen
- [ ] Error boundaries: wrap pages in an error boundary with retry button

### Typography & Spacing
- [ ] Use Mantine `<Text>`, `<Title>`, `<Anchor>` instead of raw `<p>`, `<h1>`, `<a>`
- [ ] Consistent spacing: use `rem()` or Mantine spacing tokens (xs/sm/md/lg/xl)
- [ ] Font: Poppins is set in theme — do not override `fontFamily` locally

### Colors & Theming
- [ ] Use `c="dimmed"` for secondary text, not custom gray classes
- [ ] Use `color="red"` / `color="green"` for semantic colors
- [ ] Brand color is `brand` (violet family) — use `color="brand"` for primary actions
- [ ] Dark mode: test with `useMantineColorScheme()` toggle in Header

### Accessibility
- [ ] All interactive elements have `aria-label` or visible text
- [ ] Error messages have `role="alert"` and `aria-live="polite"`
- [ ] Focus trap inside modals (`useFocusTrap`)
- [ ] Keyboard shortcuts registered with `useHotkeys` where applicable

### Performance
- [ ] Wrap expensive child components in `React.memo`
- [ ] Use `useCallback` for event handlers passed as props
- [ ] Use `useDebouncedValue` for search/filter inputs
- [ ] Lazy-load route pages with `React.lazy` + `Suspense`
- [ ] Images: `loading="lazy"`, explicit `width`/`height`, `object-fit: contain`

## How to Apply

### Step 1 — Read the target file
Use the Read tool to understand the current implementation.

### Step 2 — Identify issues
List each problem mapped to a checklist item above.

### Step 3 — Apply improvements
Make targeted edits. Do not rewrite working logic — only improve UI/UX layer.

### Step 4 — Verify
- Confirm all inputs have labels and error states
- Confirm all buttons have loading and disabled states
- Confirm spacing uses Mantine tokens, not arbitrary px values

## Common Mantine Patterns

### Loading button
```tsx
<Button loading={isLoading} type="submit" fullWidth>
  Login
</Button>
```

### Validated input
```tsx
<TextInput
  label="Email"
  placeholder="you@example.com"
  error={errors.email?.message}
  withAsterisk
  {...register("email")}
/>
```

### Password strength
```tsx
import { PasswordStrength } from "@/components/ui/input/PasswordStrength";
<PasswordStrength value={passwordVal} onChange={...} error={errors.password} />
```

### Skeleton loader
```tsx
import { Skeleton } from "@mantine/core";
{isLoading ? <Skeleton height={200} radius="md" /> : <ActualContent />}
```

### Responsive columns
```tsx
import { SimpleGrid } from "@mantine/core";
<SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
  {items.map(item => <Card key={item.id}>{item.name}</Card>)}
</SimpleGrid>
```

### Modal with confirm
```tsx
import { modals } from "@mantine/modals";
modals.openConfirmModal({
  title: "Delete item",
  children: <Text size="sm">Are you sure?</Text>,
  labels: { confirm: "Delete", cancel: "Cancel" },
  confirmProps: { color: "red" },
  onConfirm: () => handleDelete(),
});
```

### Notification
```tsx
import { useNotification } from "@/hooks";
const notify = useNotification();
// in handler:
notify.success({ message: "Profile updated!" });
notify.error({ title: "Save failed", message: error.message });
```
