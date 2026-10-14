# API documentation

## Base URL

- Development: http://localhost:5000

## Auth endpoints

- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me
- POST /api/auth/logout

## Protected endpoints

- GET /api/dashboard

## Notes

- All protected routes require a Bearer token.
- Validation and authorization checks are enforced on the server.
- Additional endpoints will be added as each phase is implemented.
