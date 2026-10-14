# Roles and permission matrix

## Core roles

- Super Admin
- Admin
- Data Staff
- Laboratory Staff
- Storekeeper
- APIN Supply Staff
- APIN Doctor
- General Doctor
- Receptionist
- Scientist
- Technical Supervisor
- Quality Manager

## Access principles

- Permissions are enforced on the backend.
- Frontend visibility is only a convenience layer.
- Record-level authorization is required for patient and clinical records.
- Staff cannot grant themselves elevated access.

## Initial role mapping

| Role | High-level permissions |
| --- | --- |
| Super Admin | System configuration, user management, audit review |
| Admin | User and workflow administration |
| Data Staff | Data-office and record workflows |
| Laboratory Staff | Lab tasks and controlled records |
| Storekeeper | Inventory control and stock movements |
| APIN Supply Staff | APIN supply submissions and receipts |
| APIN Doctor | Requests and authorized result access |
| General Doctor | Personal request/result access |
| Receptionist | Patient registration and request intake |
| Scientist | Worksheet review and approved result workflows |
| Technical Supervisor | Independent worksheet review and approval |
| Quality Manager | Controlled document and quality review |

## Pending confirmation

Institutional approval rules for signing, supervisory authorization, and record access should be configured in the live environment rather than hardcoded here.
