# Resilience Module

This module provides services for system resilience:
- **RateLimiterService**: Global and per-user rate limiting
- **RetryService**: Retry logic for transient failures
- **DlqService**: Dead Letter Queue for failed messages

Extend these services to integrate with Redis, message brokers, or other infrastructure as needed.