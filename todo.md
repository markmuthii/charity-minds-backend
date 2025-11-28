# Charity Minds Backend TODO

## Authentication & Authorization

- [ ] Finalize register/login endpoints with JWT refresh flow.
- [ ] Add role-based access controls for group leads vs members.
- [ ] Provide rate limiting and lockout for repeated failed logins.

## Core Platform

- [ ] Define data models for users, groups, and children's homes.
- [ ] Implement migrations/seeding for initial homes catalog.
- [ ] Expose CRUD endpoints for homes with validation and pagination.

## Visit Logging

- [ ] Create visit logging API with audit metadata (group, time, notes).
- [ ] Enforce one-visit-per-day constraints and handle updates/deletions.
- [ ] Build query to surface homes without recent visits.

## Insights & Listings

- [ ] Implement endpoint to list visited vs unvisited homes.
- [ ] Add filters for location, last-visited threshold, and group ownership.
- [ ] Provide aggregate analytics for distribution trends.

## Future Enhancements

- [ ] Prepare map-friendly geo fields for homes (lat/long).
- [ ] Prototype notification scheduler for stale homes.
- [ ] Instrument metrics and alerts for API health.
