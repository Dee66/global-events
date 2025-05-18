import { Injectable, Logger as NestLogger } from '@nestjs/common';

@Injectable()
export class LoggerService extends NestLogger {
  // Extend or wrap NestJS Logger for structured logging
  log(message: string, ...meta: any[]) {
    super.log(message, ...meta);
  }
  error(message: string, ...meta: any[]) {
    super.error(message, ...meta);
  }
  warn(message: string, ...meta: any[]) {
    super.warn(message, ...meta);
  }
  debug(message: string, ...meta: any[]) {
    super.debug?.(message, ...meta);
  }
}