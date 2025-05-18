# Global Event Ingestion & Notification System – Requirements

## 1. Functional Requirements

### 1.1 Event Ingestion
- The system must ingest events from:
  - Kafka
  - RabbitMQ
  - REST APIs
  - Apache NiFi (or compatible automation)
- Ingestion sources must be pluggable via a strategy interface.
- The system must support horizontal scaling and load balancing for ingestion services.

### 1.2 Data Processing
- Normalize and enrich incoming events (e.g., geo-tagging, deduplication).
- Support schema versioning for event compatibility.
- Apply RBAC and security filters before storage.
- Attach correlation IDs to all events for tracing.

### 1.3 Storage
- Store raw and processed events in Apache Cassandra (write-optimized).
- Sync data to:
  - PostgreSQL (structured queries)
  - MongoDB or ElasticSearch (semi-structured/full-text search)
- Demonstrate normalization (PostgreSQL) and denormalization (MongoDB/Elastic).

### 1.4 Notification Service
- Deliver notifications in real-time via:
  - WebSockets
  - Email (SMTP)
  - Mobile push (Firebase, stubbed/mocked)
- Trigger notifications on event arrival and user subscription filters (location, category, etc.).
- Use a strategy pattern for notification channels.

### 1.5 User & Authentication
- Support OAuth2/JWT authentication.
- Support SSO (Google, GitHub, mock acceptable).
- Enforce RBAC with Admin, Curator, and Viewer roles via NestJS guards/policies.

## 2. Non-Functional Requirements

### 2.1 Scalability & Performance
- Handle 100k–1M events per day.
- Support horizontal scaling of ingestion and notification services.
- Deliver notifications within 2 seconds of event arrival.

### 2.2 Security
- Secure all endpoints with OAuth2/JWT.
- Store secrets/configs securely (e.g., AWS Parameter Store, stub acceptable).
- Enforce RBAC and permissions at all layers.

### 2.3 Observability
- Implement full request tracing with correlation IDs.
- Centralized structured logging (Winston, AWS CloudWatch/ELK).
- Expose Prometheus metrics for throughput, failures, and latency.

### 2.4 Reliability & Resilience
- Implement global and per-user rate limiting.
- Retry logic with exponential backoff for ingestion failures.
- Dead Letter Queues (DLQs) for failed events.

### 2.5 Caching
- Use Redis for:
  - User subscriptions
  - Token/session cache
  - Notification deduplication

### 2.6 Configuration & Deployment
- Support environment-based configuration (.env, config module).
- All services must be Dockerized (multi-stage builds).
- Provide CI/CD pipeline (GitHub Actions).
- Infrastructure as code (Terraform or mock config, optional).

## 3. Acceptance Criteria

- All functional requirements are implemented and tested.
- System passes load simulation (100k–1M events/day).
- Unit, integration, and E2E tests cover core flows.
- Documentation (README, OpenAPI/Swagger) is provided.
- System is containerized and can be deployed via Docker.

---

*This document will be updated as requirements evolve.*