# Global Event Ingestion & Notification System

## Overview

This project is a scalable, production-grade backend system built with **NestJS** and modern cloud-native patterns. It demonstrates senior-level architecture and engineering practices for high-throughput event ingestion, processing, and real-time notification delivery.

The system is designed for extensibility, modularity, and parallel development—enabling teams to work independently on ingestion, processing, storage, notification, and user/auth modules.

---

## Features

- **Multi-Source Event Ingestion:** Kafka, RabbitMQ, REST APIs, Apache NiFi (pluggable via strategy pattern)
- **Data Processing:** Normalization, enrichment, schema versioning, RBAC/security filtering, correlation IDs
- **Polyglot Storage:** Cassandra (write-optimized), PostgreSQL (structured reads), MongoDB/Elastic (search)
- **Notification Service:** Real-time WebSocket, Email, and Mobile Push (strategy-based, filterable)
- **User & Auth:** OAuth2/JWT, SSO (mock), RBAC (Admin, Curator, Viewer), NestJS guards/policies
- **System Qualities:** Observability (logging, tracing, metrics), rate limiting, retry/DLQ, Redis caching
- **DevOps Ready:** Dockerized, CI/CD pipeline, environment-based config, secrets abstraction

---

## Architecture

```
                +---------------------+         +---------------------+
                |   External Sources  |         |   External Sources  |
                |   (Kafka, Rabbit)   |         |    (NiFi, APIs)     |
                +----------+----------+         +----------+----------+
                           |                              |
                           +------------+-----------------+
                                        |
                              +---------v---------+
                              |   API Gateway     |
                              |     (Nginx)       |
                              +---------+---------+
                                        |
                        +---------------v---------------+
                        |     Ingestion Service Pool    |
                        | (NestJS, retry-aware, scaled) |
                        +---------------+---------------+
                                        |
                          +-------------v-------------+
                          |   Normalization / Enrich  |
                          +-------------+-------------+
                                        |
                                +-------v-------+
                                |   Cassandra   |
                                +-------+-------+
                                        |
                        +---------------v---------------+
                        |      Sync Layer (NiFi/API)    |
                        +---+---------------+----------++
                            |               |           |
                      +-----v-----+   +-----v-----+ +---v-----+
                      |PostgreSQL |   | ElasticDB | | MongoDB |
                      +-----------+   +-----------+ +---------+

        Users → Subscriptions → Notification Service → [WebSocket | Email | Mobile Push]
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- Docker (for local development)
- (Optional) Local instances of Cassandra, PostgreSQL, MongoDB, Redis, Kafka, RabbitMQ

### Installation

```bash
git clone https://github.com/global-events.git
cd nestjs-design-patterns-app
npm install
```

### Running Locally

```bash
# Start in development mode
npm run start

# Or use Docker Compose (recommended for full stack)
docker-compose up --build
```

### Configuration

- Copy `.env.example` to `.env` and adjust as needed.
- All configuration is managed via the NestJS config module.

---

## Project Structure

```
src/
  app.controller.ts
  app.module.ts
  main.ts
  @types/                # TypeScript type definitions
  common/                # Shared utilities, guards, interceptors, decorators, interfaces
    decorators/
    filters/
    guards/
    interceptors/
    interfaces/
  config/                # Configuration and secrets abstraction
  modules/               # All main features/domains as modules
    auth/                # Authentication (OAuth2/JWT, SSO, guards)
    cache/               # Redis caching
    event/               # Event DTOs
    ingestion/           # Event source connectors (Kafka, RabbitMQ, REST, NiFi)
    messaging/           # Messaging integrations (Kafka, RabbitMQ, NiFi)
    notification/        # WebSocket, Email, Push notification channels
    observability/       # Logging, metrics, tracing
    processing/          # Normalization, enrichment, schema versioning
    rbac/                # Role-based access control logic
    resilience/          # Rate limiting, retry, DLQ
    secrets/             # Secrets management
    security/            # Security guards, roles, protected controllers
    storage/             # Cassandra, PostgreSQL, MongoDB/Elastic adapters
    subscription/        # User subscriptions
    users/               # User management, roles, profiles
  test/                  # Tests
```

---

## Development Guidelines

- **Modular Design:** Each domain is isolated for parallel development.
- **Interfaces & Contracts:** All services implement interfaces for testability and extensibility.
- **Strategy Patterns:** Used for pluggable event sources and notification channels.
- **Testing:** Unit, integration, and E2E tests are encouraged for all modules.
- **Observability:** Use provided logging and tracing utilities for all new code.

---

## Event Ingestion Technologies

This project demonstrates integration with multiple industry-standard messaging and data flow platforms, each chosen for their unique strengths in a modern event-driven architecture:

- **Kafka:**  
  Serves as the primary high-throughput event backbone. Used for ingesting large volumes of external, real-time event data such as weather alerts, news, and public safety notifications. Kafka enables scalable, durable, and replayable event streaming.

- **RabbitMQ:**  
  Provides flexible routing and transactional delivery for events that require guaranteed processing or complex routing logic. Ideal for handling user- or device-originated events, such as geolocation updates or personalized notifications.

- **Apache NiFi:**  
  Acts as a data flow orchestrator and ETL (Extract, Transform, Load) engine. Used to integrate with diverse external sources, transform and enrich incoming data, and route events to Kafka or RabbitMQ as appropriate.

- **REST API:**  
  Allows direct, ad-hoc event submission from partners, administrators, or custom integrations. Supports rapid prototyping and manual testing of the event pipeline.

Each technology is integrated using a pluggable, strategy-based approach, showcasing best practices in modularity, extensibility, and real-world system design.

---

## Monorepo Structure & Microservices

This repository contains multiple applications to demonstrate a real-world, microservices-based event-driven architecture:

- **nestjs-design-patterns-app/**  
  The main NestJS application, containing API, processing, notification, user, and other modules.

- **ingestion-service/**  
  A dedicated NestJS microservice responsible for ingesting events from Kafka, RabbitMQ, NiFi, and REST. This service is independently deployable and horizontally scalable.

Shared DTOs and interfaces are copied or referenced as needed for clarity and separation.

See each folder's README for more details on its responsibilities and how to run it.

---

## Contributing

1. Fork the repo and create a feature branch.
2. Implement your feature/module following the interface contracts.
3. Write tests for your code.
4. Submit a pull request with a clear description.

See [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

---

## Roadmap

- [ ] Implement core event pipeline (ingestion → processing → storage → notification)
- [ ] Integrate OAuth2/JWT and SSO
- [ ] Add observability (logging, metrics, tracing)
- [ ] Add Docker, CI/CD, and deployment scripts
- [ ] Implement rate limiting, retry, and DLQ
- [ ] Add Redis caching and deduplication
- [ ] Write comprehensive tests and simulation scripts

---

## License

MIT

---

*This README will be refined as the project evolves. For questions or suggestions, open an issue or contact the maintainers.*
````
