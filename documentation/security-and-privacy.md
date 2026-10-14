# Security and privacy

## Core safeguards

- JWT authentication on the backend
- User activation tracking
- Rate limiting for public endpoints
- CORS and Helmet headers
- In-memory database support for test isolation
- Synthetic data only in demo environments

## Operational notes

- Real patient identifiers and production credentials must never be committed to the repository.
- File uploads and report downloads should enforce record-level authorization.
- Audit events must remain append-only and protected from ordinary user modification.
- The institution must confirm retention, backup, and recovery requirements before live clinical use.
