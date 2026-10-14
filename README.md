# APIN–JUTH Laboratory Operations and Staff Management App

This repository contains the initial foundation for a secure, mobile-first laboratory operations application supporting APIN–JUTH workflows.

## Scope of this version

This is the Phase 1 foundation and includes:

- Secure backend API with authentication and role-based authorization
- User, role, and department models
- Audit trail foundation
- Role-aware dashboard shell for the mobile app
- Synthetic seed data and test coverage for key access rules
- Documentation for requirements and permissions

## Project structure

- `backend/` — Express API, Mongoose models, auth middleware, and tests
- `mobile/` — Expo app scaffold
- `documentation/` — requirement and design notes
- `.env.example` — environment template

## Quick start

1. Copy `.env.example` to `.env` and adjust values.
2. Install dependencies:
   npm install
3. Start the backend:
   npm run dev:backend
4. Run tests:
   npm test
5. Start the mobile app:
   npm run dev:mobile

## Important notes

- No real patient, staff, or institutional credentials are committed to this repository.
- The forms referenced in the uploaded APIN PDFs must be confirmed by the institution before clinical use.
- All role permissions are configurable and enforced on the backend, not only in the frontend.

## Phase plan

- Phase 1: foundation, authentication, roles, departments, audit and dashboards
- Phase 2: operational workflows and inventory
- Phase 3: laboratory requests, worksheets and results
- Phase 4: quality control and administration
- Phase 5: staff recognition and roster management
- Phase 6: verification, pilot prep and documentation
