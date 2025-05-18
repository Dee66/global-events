# Ingestion Module

Handles event ingestion from multiple sources:
- Kafka
- RabbitMQ
- REST APIs
- Apache NiFi

Each source is implemented as a service in the `sources/` folder.  
Extend these services to connect to real sources and push events into the processing pipeline.