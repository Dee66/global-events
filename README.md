# Global Event Ingestion & Notification System

## Overview

This project is a scalable, production-grade backend system built with **NestJS** and modern cloud-native patterns. It demonstrates senior-level architecture and engineering practices for high-throughput event ingestion, processing, and real-time notification delivery.

The system is organized as a **monorepo** with a microservices-oriented architecture. Each major domain (such as event ingestion, processing, storage, notification, and user/auth) is implemented as an independent service or module, enabling parallel development, independent deployment, and improved scalability.

---

## Solution Highlights

- **Multi-Source Event Ingestion:**  
  The ingestion microservice supports pluggable event sources using the strategy pattern. It can ingest events from Kafka (high-throughput, persistent streaming), RabbitMQ (transactional, flexible routing), REST APIs (ad-hoc/manual), and Apache NiFi (visual ETL/dataflow).  
  **NiFi** is leveraged as a dataflow orchestrator, integrating with diverse external sources, transforming/enriching data, and routing events to Kafka or RabbitMQ. This decouples data acquisition from processing and enables rapid integration of new sources.

- **Event-Driven, Decoupled Architecture:**  
  Events are ingested via Kafka and RabbitMQ, allowing for scalable, reliable, and replayable pipelines. The ingestion service consumes from these brokers, validates and normalizes events, and forwards them for enrichment and storage.

- **Normalization, Enrichment, and Polyglot Storage:**  
  Events are normalized and enriched (e.g., geo-tagging, deduplication, schema versioning) before being stored in Cassandra (write-optimized), PostgreSQL (structured reads), and MongoDB/Elastic (search). Data replication and sync are managed via NiFi or a custom sync layer.

- **Real-Time Notification Service:**  
  Users receive notifications via WebSocket, Email, or Mobile Push, with delivery channels abstracted using the strategy pattern. Notification triggers are based on event arrival and user subscription filters.

- **Security & Observability:**  
  OAuth2/JWT authentication, RBAC, and NestJS guards/policies secure the system. Full observability is provided via structured logging, tracing, and Prometheus metrics. Rate limiting, retry logic, and DLQ ensure resilience.

- **DevOps & Extensibility:**  
  All services are Dockerized and orchestrated with Docker Compose for local development. CI/CD pipelines, environment-based config, and secrets abstraction are included. The architecture is designed for easy extension (new event sources, notification channels, storage backends).

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
- (Optional) Local instances of Cassandra, PostgreSQL, MongoDB, Redis, Kafka, RabbitMQ, NiFi

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
