# Travora

Flight-first travel booking and reservation platform.

## V1 goal

Travora focuses only on flights:

- Search and compare flights
- Airline/travel-partner booking links
- User sign up and sign in
- My bookings
- Reservation management
- Flight status/tracking
- Booking notifications

## Current build

Build 1 establishes the responsive flight-first homepage, search UI, account entry points, and CI build pipeline.

## Roadmap

1. Foundation and flight-first UI
2. Supabase authentication
3. Flight search provider integration
4. Airline/deep-link booking
5. My bookings and reservation management
6. Payment and confirmation flows
7. Flight status tracking
8. Production hardening

## Development

```bash
npm install
npm run dev
```

Travora is intentionally designed so flight providers can be swapped or combined behind a normalized search interface.

Build 2 dependency fix verified: Supabase browser client package is included in the application dependencies.


## Production security
Build 8I database security migration has been applied and verified in the Travora Supabase project.
