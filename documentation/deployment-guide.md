# Deployment guide

## Local development

1. Copy `.env.example` to `.env` and update values.
2. Run `npm install` in the root project.
3. Start backend: `npm run dev:backend`
4. Start Expo app: `npm run dev:mobile`

## Pilot and production

- Use a separate environment for staging and production.
- Keep secrets in environment variables, not in code.
- Set up backups and recovery procedures before any pilot environment is used with real records.
- Obtain institutional approval before connecting to real clinical or operational systems.
