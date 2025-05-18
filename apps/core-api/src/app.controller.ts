import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getRoot(): string {
    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <title>Global Event Ingestion & Notification System</title>
          <link rel="icon" type="image/x-icon" href="/favicon.ico">
          <style>
            body {
              font-family: 'Segoe UI', Arial, sans-serif;
              background: linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%);
              color: #22223b;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 700px;
              margin: 40px auto;
              background: #fff;
              border-radius: 18px;
              box-shadow: 0 4px 24px #1e293b22;
              padding: 36px 40px 28px 40px;
            }
            h1 {
              text-align: center;
              font-size: 2.2rem;
              margin-bottom: 0.5em;
              color: #2563eb;
              letter-spacing: 1px;
            }
            .subtitle {
              text-align: center;
              font-size: 1.1rem;
              color: #475569;
              margin-bottom: 2em;
            }
            ul, ol {
              margin-left: 1.2em;
              margin-bottom: 1.2em;
            }
            li {
              margin-bottom: 0.4em;
            }
            .api-links {
              margin: 1.5em 0;
              padding: 1em;
              background: #f1f5f9;
              border-radius: 8px;
            }
            .api-links code {
              background: #e0e7ef;
              padding: 2px 6px;
              border-radius: 4px;
              color: #1e293b;
            }
            hr {
              margin: 2em 0 1em 0;
              border: none;
              border-top: 1px solid #e5e7eb;
            }
            small {
              color: #64748b;
              display: block;
              text-align: center;
            }
            .logo {
              display: flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 1em;
            }
            .logo-emoji {
              font-size: 2.2rem;
              margin-right: 0.5em;
            }
            @media (max-width: 600px) {
              .container { padding: 18px 6px; }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo">
              <span class="logo-emoji">🌐</span>
              <h1>Global Event Ingestion & Notification System</h1>
            </div>
            <div class="subtitle">
              Unified API for real-time global event ingestion, processing, and notification delivery.
            </div>

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

            <div class="api-links">
              <h3>Explore the API</h3>
              <ul>
                <li>Check <code>/api</code> for OpenAPI/Swagger documentation</li>
                <li>See <code>/health</code> for service status</li>
                <li>Contact the team for integration details</li>
              </ul>
            </div>

            <hr/>
            <small>
              See the project <a href="https://github.com/Dee66/global-events" target="_blank">README</a> for architecture and usage details.<br/>
              Built with <b>NestJS</b>, <b>Docker</b>, and cloud-native best practices.
            </small>
          </div>
        </body>
      </html>
    `;
  }
}