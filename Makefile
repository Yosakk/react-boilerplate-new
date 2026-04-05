.PHONY: i18n lint format typecheck dev build

## Generate i18n barrel files + missing stubs
i18n:
	npx tsx scripts/generate-i18n.ts

## Run ESLint
lint:
	pnpm lint

## Run ESLint with auto-fix
lint-fix:
	pnpm lint:fix

## Format all files with Prettier
format:
	pnpm format

## TypeScript type check
typecheck:
	npx tsc --noEmit

## Dev server
dev:
	pnpm dev

## Production build
build:
	pnpm build:prod

## Full check: i18n + format + lint + typecheck
check: i18n format lint-fix typecheck
	@echo "All checks passed!"
