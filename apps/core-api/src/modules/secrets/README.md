# Secrets Module

This module provides a service abstraction for accessing secrets (API keys, credentials, etc.).
- Extend `SecretsService` to integrate with a real secrets manager (AWS Secrets Manager, HashiCorp Vault, etc.).
- Use this service instead of accessing environment variables directly in your business logic.