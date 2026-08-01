# Recovery Center Website

Production-ready Next.js website for Recovery Center with Spanish content, service landing pages, contact intake API, and automated CI/deploy workflows.

![CI](https://github.com/TaniaTenorio/recoverycenter/actions/workflows/ci.yml/badge.svg)
![Deploy to Vercel](https://github.com/TaniaTenorio/recoverycenter/actions/workflows/deploy-vercel.yml/badge.svg)

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- ESLint
- GitHub Actions (CI + deploy)

## Project highlights

- Public pages: home, servicios, servicio detail, nosotros, contacto.
- API routes: contact submit, contact health, Google reviews bridge.
- SEO endpoints: robots and sitemap.
- Structured content layer in src/data.
- Local image assets in public/images.

## Local development

```bash
npm install
npm run dev
```

App URL: http://localhost:3000

## Validation

```bash
npm run lint
npm run build
```

## CI and deployment

### CI workflow

- File: .github/workflows/ci.yml
- Trigger: push and pull_request to main
- Checks: lint + build

### Production deploy workflow

- File: .github/workflows/deploy-vercel.yml
- Trigger: push to main and manual dispatch
- Target: Vercel production deployment

## GitHub secrets required for deploy

Add these repository secrets in GitHub before enabling production deploys:

```bash
VERCEL_TOKEN=
VERCEL_ORG_ID=
VERCEL_PROJECT_ID=
```

How to retrieve values:

1. Create VERCEL_TOKEN in Vercel dashboard -> Settings -> Tokens.
2. Run vercel link once locally and read VERCEL_ORG_ID / VERCEL_PROJECT_ID from .vercel/project.json.

## Release process

1. Create a branch from main.
2. Implement changes.
3. Run npm run lint and npm run build locally.
4. Open a pull request to main.
5. Wait for CI check CI / quality-and-build to pass.
6. Merge PR.
7. Confirm Deploy to Vercel workflow succeeds.
8. Run smoke tests in production.

## Branch protection recommendation

In GitHub Settings -> Branches, enable protection for main with:

1. Require pull request before merging.
2. Require status checks to pass.
3. Required check: CI / quality-and-build.
4. Optional: block direct pushes to main.

## Environment variables

Full deployment and environment checklist:

- docs/production-deploy.md

Additional docs:

- docs/contact-webhook-setup.md
- docs/hostgator-email-setup.md
- docs/plugin-mapping.md
