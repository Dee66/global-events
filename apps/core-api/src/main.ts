process.env.RABBITMQ_URI = process.env.RABBITMQ_URI || "amqp://rabbitmq";

import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["error", "debug", "log", "verbose", "warn"],
  });
  const logger = new Logger("Bootstrap");

  // Enable URI versioning: /v1/...
  // app.enableVersioning({
  //   type: 'uri' as any,
  //   defaultVersion: "1",
  // });

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle("Global Event Ingestion & Notification API")
    .setDescription(
      "API documentation for the event ingestion and notification system"
    )
    .setVersion("1.0.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs/api", app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);

  logger.log(`Application is running on: http://localhost:${port}`);
  logger.log(`Swagger docs available at: http://localhost:${port}/docs/api`);
}

bootstrap();
