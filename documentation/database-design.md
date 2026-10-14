# Initial database design

## Core collections

- users
- roles
- departments
- auditEvents
- meetings
- attendanceRecords
- notifications
- inventoryItems
- stockReceipts
- stockRequests
- stockTransactions
- labRequests
- worksheets
- results
- controlledDocuments
- qualityActions
- equipment
- maintenanceRequests
- leaveRequests
- elections
- ballots
- rosters
- tasks

## Design principles

- Use Mongoose schemas to keep validation reusable.
- Store each critical action in an append-only audit event.
- Use unique indexes for email, item codes, and request identifiers.
- Use transactions for stock movement and voting logic.
- Archive superseded result and document versions rather than overwriting them.

## Immediate focus

This initial version implements the schema foundation for users, roles, departments, and audit events. Additional domain schemas will be added as each phase is completed and tested.
