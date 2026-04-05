# Create New Feature (Full Stack)

**IMPORTANT:** Follow ALL rules and run ALL checks before finishing.

## What This Covers
Creating a complete feature: API service + interfaces + hooks + page + route + translations.

## Directory Structure
```
src/
├── _interfaces/<feature>.interfaces.ts
├── _services/<feature>/index.ts
├── pages/<feature>/
│   ├── index.tsx                    ← barrel export
│   ├── <Feature>Page.tsx            ← page component (JSX only)
│   ├── hooks/
│   │   ├── use<Feature>Api.ts       ← RTK Query hooks
│   │   └── use<Feature>Page.ts      ← page logic hook
│   └── sections/                    ← sub-components
│       ├── <Feature>Header.tsx
│       └── <Feature>List.tsx
├── locales/en/<feature>/index.ts
└── routes/routes.tsx                ← add route
```

## Step-by-Step

### 1. Interfaces (`_interfaces/<feature>.interfaces.ts`)
```ts
export interface FeatureI {
  id: string;
  name: string;
}

export interface FeatureListReqI {
  page: number;
  limit: number;
  search?: string;
}

export interface FeatureListResI {
  data: FeatureI[];
  meta: Meta; // from pagination.interface.ts
}
```

### 2. API Service (`_services/<feature>/index.ts`)
```ts
import { Api } from "../api";
import type {
  FeatureI,
  FeatureListReqI,
  FeatureListResI,
} from "@/_interfaces/<feature>.interfaces";

const prefix = "/<feature>/v1";

export const featureApi = Api.injectEndpoints({
  endpoints: (build) => ({
    getFeatures: build.query<FeatureListResI, FeatureListReqI>({
      query: (params) => ({
        url: `${prefix}/`,
        method: "GET",
        params,
      }),
      providesTags: ["Feature"],
    }),
    createFeature: build.mutation<FeatureI, Partial<FeatureI>>({
      query: (body) => ({
        url: `${prefix}/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Feature"],
    }),
  }),
});

export const {
  useGetFeaturesQuery,
  useCreateFeatureMutation,
} = featureApi;
```

**Then add `"Feature"` to `tagTypes` in `src/_services/api.ts`.**

### 3. API Hook (`pages/<feature>/hooks/use<Feature>Api.ts`)
```ts
import {
  useGetFeaturesQuery,
  useCreateFeatureMutation,
} from "@/_services/<feature>";
import { errorHandler } from "@/_services/errorHandler";
import { useNotification } from "@/hooks";

export function use<Feature>Api() {
  const notify = useNotification();

  const {
    data,
    isLoading: isLoadingList,
    error,
  } = useGetFeaturesQuery({ page: 1, limit: 10 });

  const [createFeature, { isLoading: isCreating }] =
    useCreateFeatureMutation();

  const handleCreate = async (body: any) => {
    try {
      await createFeature(body).unwrap();
      notify.success({ message: "Created!" });
    } catch (err) {
      errorHandler(err);
    }
  };

  return {
    items: data?.data ?? [],
    isLoadingList,
    isCreating,
    handleCreate,
    error,
  };
}
```

### 4. Page Hook (`pages/<feature>/hooks/use<Feature>Page.ts`)
```ts
import { usePageTitle } from "@/hooks";
import { use<Feature>Api } from "./use<Feature>Api";

export function use<Feature>Page() {
  usePageTitle("<Feature>");
  const api = use<Feature>Api();

  // Compose UI state + API state
  return { ...api };
}
```

### 5. Sections (sub-components in `sections/`)
Break page into focused sections. Each section:
- Receives props from page component
- Has its own file
- Uses Mantine components for layout

### 6. Page Component, Barrel, Route, Translations
Follow the `/create-page` skill for these steps.

### 7. Run checks
```bash
make i18n       # Generate translation barrels
make typecheck  # TypeScript
make lint-fix   # ESLint + fix
make format     # Prettier
```

## Rules Summary
| Rule | Details |
|------|---------|
| Validation | **Zod** only (not Yup) |
| Forms | react-hook-form + zodResolver |
| API errors | Always `errorHandler(err)` |
| Notifications | `useNotification()` from `@/hooks` |
| Auth | `useAuth()` from `@/hooks` |
| Page title | `usePageTitle()` in page hook |
| index.tsx | Barrel exports ONLY |
| Page component | ZERO hooks/effects — all in hooks/ |
| Hooks | Separated: API hook + page hook |
| Routes | Lazy-loaded, relative paths, constants |
| Translations | `make i18n` after adding keys |
| Line length | Max 80 chars (Prettier) |
| Input styles | From theme — no inline `styles` |
