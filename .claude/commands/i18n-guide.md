# i18n Translation Guide

**IMPORTANT:** Always run `make i18n` after adding or modifying translation modules.

## Structure
```
src/locales/
├── i18n.ts          ← i18next config (EN + ID)
├── en/
│   ├── index.ts     ← AUTO-GENERATED barrel
│   ├── common/index.ts
│   ├── auth-login/index.ts
│   └── ...80+ modules
└── id/
    ├── index.ts     ← AUTO-GENERATED barrel
    ├── common/index.ts
    └── ... (mirrors en/)
```

## How It Works
- `en/` is the source of truth
- Each module is a folder with `index.ts` exporting a `const` object
- `make i18n` (or `npx tsx scripts/generate-i18n.ts`):
  1. Scans `en/` for all modules
  2. Creates missing stubs in `id/` automatically
  3. Regenerates `en/index.ts` and `id/index.ts` barrel files

## Adding Translations

### 1. Create module in `en/`
```ts
// src/locales/en/<module-name>/index.ts
export default {
  title: "My Feature",
  description: "Some description",
  form: {
    nameLabel: "Name",
    namePlaceholder: "Enter your name",
    submit: "Save",
  },
  validation: {
    required: "This field is required",
    minLength: "Must be at least {{min}} characters",
  },
} as const;
```

### 2. Run auto-generate
```bash
make i18n
```
This will:
- Create `src/locales/id/<module-name>/index.ts` stub if missing
- Update both `en/index.ts` and `id/index.ts` barrels

### 3. Use in components
```tsx
import { useTranslation } from "react-i18next";

const { t } = useTranslation();
t("moduleName.title");
t("moduleName.form.nameLabel");
t("moduleName.validation.minLength", { min: 3 });
```

## Key Naming Convention
| Pattern | Example |
|---------|---------|
| Module = kebab-case folder | `auth-login/`, `play-center/` |
| Key in code = camelCase | `t("authLogin.title")` |
| Nested keys with dot | `t("authLogin.validation.blank")` |
| Interpolation | `t("key", { count: 5 })` → `"{{count}} items"` |
| Plural | Not used — use interpolation |

## Module → Key Mapping
The folder name is converted to camelCase for the key:
- `auth-login/` → `t("authLogin.xxx")`
- `auth-register-account/` → `t("authRegisterAccount.xxx")`
- `common/` → spread at root level (no prefix)

## Rules
- **NEVER** edit `en/index.ts` or `id/index.ts` manually — they are auto-generated
- Always add translations in `en/` first, then run `make i18n`
- Fill in `id/` translations after the stub is created
- Use `as const` on all export objects for type safety
- Keep keys flat where possible (max 2 levels deep)
- Use interpolation `{{var}}` for dynamic values — not string concatenation
- Translation values must be strings (no JSX)

## Common Patterns

### Validation messages with Zod
```ts
// In schema
z.string().min(1, t("feature.validation.required"))

// In locale
export default {
  validation: {
    required: "This field is required",
    email: "Please enter a valid email",
    minLength: "Must be at least {{min}} characters",
  },
} as const;
```

### Shared validation keys
Use the existing `validation/` module for generic messages:
```ts
t("validation.required")
t("validation.email")
```

### Page-specific keys
Each page should have its own module:
```ts
// src/locales/en/my-feature/index.ts
export default {
  pageTitle: "My Feature",
  // ...
} as const;
```
