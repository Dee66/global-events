# Global Event Ingestion & Notification System

## Overview

This project is a scalable, production-grade backend system built with **NestJS** and modern cloud-native patterns. It demonstrates senior-level architecture and engineering practices for high-throughput event ingestion, processing, and real-time notification delivery.

The system is organized as a **monorepo** with a microservices-oriented architecture. Each major domain (such as event ingestion, processing, storage, notification, and user/auth) is implemented as an independent service or module, enabling parallel development, independent deployment, and improved scalability.

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

The system is organized as a **monorepo** containing multiple independently deployable services. Each service is responsible for a specific domain, and all services communicate via well-defined interfaces and messaging patterns.

```
global-events/
  apps/
    core-api/      # Main API, processing, notification, user, and other modules
    ingestion/     # Dedicated microservice for event ingestion (Kafka, RabbitMQ, NiFi, REST)
  libs/            # (optional) Shared libraries, DTOs, and interfaces
  docker-compose.yml
  nginx.conf
```

**Key Benefits:**
- **Separation of Concerns:** Each microservice handles a distinct responsibility (e.g., ingestion, processing, notification).
- **Scalability:** Services can be scaled independently based on workload.
- **Parallel Development:** Teams can work on different services without blocking each other.
- **Resilience:** Failures in one service do not bring down the entire system.
- **Easier Testing & Deployment:** Each service can be tested and deployed independently.

---

## Architecture Diagram

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
                        |     Ingestion Microservice    |
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
git clone https://github.com/Dee66/global-events.git
cd global-events
npm install
```

### Running Locally

```bash
# Start in development mode (for a single service)
cd apps/core-api
npm run start

# Or use Docker Compose (recommended for full stack, including all microservices)
docker compose up --build
```

### Configuration

- Copy `.env.example` to `.env` and adjust as needed.
- All configuration is managed via the NestJS config module.

---

## Project Structure

```
apps/
  core-api/         # Main API, processing, notification, user, and other modules
  ingestion/        # Dedicated event ingestion microservice
libs/               # (optional) Shared libraries, DTOs, and interfaces
docker-compose.yml  # Orchestrates all services and dependencies
nginx.conf          # NGINX reverse proxy configuration
README.md
```

---

## Development Guidelines

- **Modular Design:** Each domain is isolated for parallel development.
- **Interfaces & Contracts:** All services implement interfaces for testability and extensibility.
- **Strategy Patterns:** Used for pluggable event sources and notification channels.
- **Testing:** Unit, integration, and E2E tests are encouraged for all modules.
- **Observability:** Use provided logging and tracing utilities for all new code.

---

## Microservices in This Monorepo

- **core-api/**  
  The main NestJS application, containing API, processing, notification, user, and other modules.

- **ingestion/**  
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
