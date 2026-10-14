# Testing guide

## Run the backend tests

npm test

## Manual checks

- Register a user via `/api/auth/register`
- Sign in via `/api/auth/login`
- Access `/api/dashboard` with a valid token
- Attempt protected access without a token
- Use the in-memory database in automated tests

## Synthetic data

All demo accounts and records must remain synthetic and must not contain real patient data or genuine credentials.
