# LayoutCraft

LayoutCraft is a drag-and-drop page layout builder for creating structured landing pages with sections, rows, columns, and reusable components.

It is built with a feature-first architecture and typed domain models, with save/load persistence and a dedicated preview flow.

## Core Features

- Drag-and-drop layout editing (sections, rows, columns, components)
- Component editing with typed props
- Undo/redo history
- Template loading (Travel Landing Template)
- Save + load with validation and auto-repair
- Separate preview page for saved layouts

## Tech Stack

- Next.js (App Router)
- React + TypeScript
- Zustand
- dnd-kit
- Tailwind CSS
- Vitest
- ESLint

## Project Structure

```text
app/
	page.tsx                                -> Builder entry page
	preview/page.tsx                        -> Saved-layout preview page

src/features/builder/
	model/
		types.ts                              -> Domain types
		factories.ts                          -> Runtime object creation
		templates/travelLandingTemplate.ts    -> Template data
		validation.ts                         -> Layout validation + repair
		layoutRepository.ts                   -> Persistence port (contract)
		storage.ts                            -> Storage constants
	infra/
		localStorageLayoutRepository.ts       -> localStorage adapter
	store/
		useBuilderStore.ts                    -> Editor state/actions
		layoutTransforms.ts                   -> Pure immutable transforms
		*.test.ts                             -> Unit tests
	ui/
		BuilderApp.tsx                        -> Main builder shell
		BuilderTopbar.tsx                     -> Topbar actions
		BuilderCanvas.tsx                     -> Canvas surface
		ComponentPalette.tsx                  -> Draggable components
		PreviewRenderer.tsx                   -> Final rendered output
```

## Getting Started

### 1) Install Dependencies

```bash
npm install
```

### 2) Run in Development

```bash
npm run dev
```

Open `http://localhost:3000`.

### 3) Run Production Build Locally

```bash
npm run build
npm start
```

`npm start` always serves the latest built output. Re-run `npm run build` after code changes.

## Scripts

| Command             | Purpose                  |
| ------------------- | ------------------------ |
| `npm run dev`       | Start development server |
| `npm run build`     | Build production bundle  |
| `npm start`         | Start production server  |
| `npm test -- --run` | Run unit tests once      |
| `npm run lint`      | Run ESLint checks        |

## Usage Guide

### Feature Images

Images are in `public/images`.

1. Drag & Drop

![Drag and drop flow](/images/drag_drop.png)

2. Template 1

![Template 1](/images/template.png)

3. Template 2

![Template 2](/images/template2.png)

4. Template 3

![Template 3](/images/template3.png)

### Step-by-Step Workflow

1. Open `/` and start in the builder.
2. Build layout structure (section/row/column).
3. Drag components from the left palette into columns.
4. Reorder/move components across the canvas.
5. Edit component content and settings.
6. Load Travel Template when needed.
7. Save layout.
8. Open `/preview` to verify final output.

### Topbar Actions

- **Page Title**: update page title in state
- **+ Add Section**: append a new section
- **Load Travel Template**: replace current layout with template
- **Save**: validate and persist layout
- **Undo / Redo**: navigate edit history
- **View Page**: save and open preview

## Architecture Notes

- Domain model is defined in `model/types.ts`.
- Template content is separated in `model/templates/*` for readability.
- Persistence uses port/adapter style:
  - Port: `model/layoutRepository.ts`
  - Adapter: `infra/localStorageLayoutRepository.ts`
- Transformation logic is pure in `store/layoutTransforms.ts`.

## Troubleshooting

### Different Output in `dev` vs `start`

- Run `npm run build` before `npm start`.
- Ensure builder and preview use the same origin/port (localStorage is origin-specific).

### `npm start` exits with code 1

- Usually missing/stale production build.
- Fix:

```bash
npm run build
npm start
```

## Developer Workflow

1. Pull latest changes.
2. Install/update deps (`npm install`).
3. Develop with `npm run dev`.
4. Keep commits small and focused.
5. Validate before commit:

```bash
npm test -- --run
npm run lint
```

6. Manually verify:

- Drag/drop behavior
- Template load
- Save + preview (`/preview`)

7. Run production parity check (`npm run build && npm start`).

## Release Checklist

- [ ] `npm test -- --run` passes
- [ ] `npm run lint` passes
- [ ] `npm run build` succeeds
- [ ] Builder core flows verified (`/`)
- [ ] Preview verified (`/preview`)
- [ ] Documentation updated
- [ ] No debug code or temporary TODOs

## PR Checklist (Copy/Paste)

Use this in your GitHub PR description:

```markdown
### PR Checklist

- [ ] Scope is focused and related to one clear goal
- [ ] `npm test -- --run` passes locally
- [ ] `npm run lint` passes locally
- [ ] `npm run build` passes locally
- [ ] Builder flow manually verified (`/`)
- [ ] Preview flow manually verified (`/preview`)
- [ ] No breaking changes (or clearly documented below)
- [ ] README/docs updated if behavior changed

### Notes

- Breaking changes: None / (describe)
- Follow-ups: None / (describe)
```

## PR Checklist (Strict: Large/Refactor PRs)

Use this for architecture changes, major refactors, and high-impact updates:

```markdown
### PR Checklist (Strict)

#### Scope & Design

- [ ] Problem statement is clear and linked to issue/task
- [ ] Architectural impact explained (what changed and why)
- [ ] Alternatives considered and documented briefly
- [ ] Public behavior/API changes clearly listed

#### Safety & Compatibility

- [ ] Backward compatibility checked
- [ ] Breaking changes documented with migration steps
- [ ] Data/storage/schema impact reviewed (if applicable)
- [ ] Rollback plan documented

#### Verification

- [ ] `npm test -- --run` passes locally
- [ ] `npm run lint` passes locally
- [ ] `npm run build` passes locally
- [ ] Critical user flows manually tested end-to-end
- [ ] Edge cases tested (empty/malformed/large inputs)

#### Quality

- [ ] Code is modular and follows feature boundaries
- [ ] New/changed logic covered by tests
- [ ] No dead code, debug logs, or temporary flags left
- [ ] README/docs updated to reflect the change

#### Release Readiness

- [ ] Release notes prepared
- [ ] Monitoring/alerting considerations noted (if applicable)
- [ ] Post-release validation steps listed

### Risk Assessment

- Risk level: Low / Medium / High
- ## Main risks:
- ## Mitigations:

### Migration / Rollback

- Migration steps:
  1.
  2.
- Rollback steps:
  1.
  2.
```
