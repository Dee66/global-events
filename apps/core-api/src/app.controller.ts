import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getRoot(): string {
    return `
      🌐 <b>Global Event Ingestion & Notification System</b> 🌐

      Welcome to the unified API for real-time global event ingestion, processing, and notification delivery.

      <h3>What is this?</h3>
      <ul>
        <li><b>Multi-source event ingestion</b> from Kafka, RabbitMQ, REST, and Apache NiFi</li>
        <li><b>Data normalization & enrichment</b> for geo-tagged, deduplicated, and schema-versioned events</li>
        <li><b>Polyglot storage</b> with Cassandra, PostgreSQL, and MongoDB</li>
        <li><b>Real-time notifications</b> via WebSocket, Email, and Mobile Push</li>
        <li><b>Enterprise-grade security</b> with OAuth2/JWT, SSO, and RBAC</li>
        <li><b>Observability</b> with logging, tracing, metrics, and rate limiting</li>
      </ul>

      <h3>How does it work?</h3>
      <ol>
        <li>Events flow in from multiple sources and are processed in real time</li>
        <li>Data is normalized, enriched, and securely stored</li>
        <li>Users receive instant notifications based on their subscriptions and filters</li>
      </ol>

      <h3>Explore the API</h3>
      <ul>
        <li>Check <code>/docs</code> for OpenAPI/Swagger documentation (coming soon)</li>
        <li>See <code>/health</code> for service status</li>
        <li>Contact the team for integration details</li>
      </ul>

      <hr/>
      <small>
        <i>See the project <a href="https://github.com/Dee66/global-events" target="_blank">README</a> for architecture and usage details.<br/>
        Built with NestJS, Docker, and cloud-native best practices.</i>
      </small>
    `;
  }
}