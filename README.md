# EventHub: Event Ticketing & Booking Platform (Backend)

A production-style REST API for creating events and booking tickets online.
Built to handle real-world backend problems: concurrent bookings, caching,
rate limiting, payment webhooks and live updates.

## Tech Stack

Node.js, TypeScript, Express, MongoDB (Mongoose), Redis (ioredis),
Stripe, Socket.io, Zod, JWT, Nodemailer, Multer

## Features

- JWT authentication (access + refresh tokens) with role-based access (admin / organizer / attendee)
- Email verification and password reset (Nodemailer)
- Event and ticket tier management with banner upload (Multer)
- Search, filter and pagination using MongoDB aggregation
- Redis caching for hot endpoints
- Redis-backed rate limiting
- Overselling prevention with Redis locks and ticket holds (TTL)
- Stripe Checkout, webhook verification, idempotency and refunds
- Organizer analytics dashboard (revenue, top events, sales per day)
- Live ticket availability via WebSocket (Socket.io)
- Background job to expire unpaid bookings

## Architecture

```
Routes -> Controllers -> Services -> Models
```

- **Controllers:** handle req/res only
- **Services:** business logic
- **Models:** database schemas

## Project Structure

```
src/
├── config/        # env, db, redis, stripe, mailer
├── models/
├── controllers/
├── services/
├── routes/
├── middlewares/
├── validators/    # zod schemas
├── utils/
├── sockets/
├── jobs/
├── templates/
├── types/
├── app.ts
└── server.ts
```

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Redis (local or Redis Cloud)

### Setup

```bash
git clone <your-repo-url>
cd eventhub-backend
npm install
cp .env.example .env    # then fill in your values
npm run dev
```

### Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start with hot reload (tsx) |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run the compiled build |
| `npm run typecheck` | Type-check without emitting |

## API

Base URL: `/api/v1`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Server, MongoDB and Redis status |

> More endpoints are documented as they are built. A Postman collection will be added in `/docs`.

## Progress

- [x] Day 1: Project setup, error handling, DB + Redis connection


## Author

Your Name | [GitHub](github.com/Dhaniadeepak) | [LinkedIn](https://www.linkedin.com/in/deepak-kumar-1479102b2)