# Requirements summary

This project digitizes the APIN-supported JUTH laboratory operations and staff-management workflows described in the supplied APIN reference materials. The initial implementation focuses on a secure backend foundation, configurable roles, and a role-aware dashboard shell. The laboratory-specific forms and workflows must be confirmed by the institution before clinical deployment.

## In-scope Phase 1

- Authentication and session controls
- User accounts and role-based access
- Department configuration and audit foundation
- Dashboard shell for different user roles
- Seed data and policy documentation

## Out-of-scope / pending confirmation

- Official form fields not legible in the uploaded documents
- Final reference intervals and clinical policies
- Real institutional branding assets and approval logs
- Production deployment credentials
- Real patient or employee records

## Design assumptions

- The application will use synthetic records for all demos and tests.
- The project is mobile-first and Android-first, with a future path for iOS.
- A single Express API is used as the primary backend service.
- MongoDB provides the default data store, with in-memory database support for testing.
