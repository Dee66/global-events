import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import configuration from "./config/configuration";
import { SecurityModule } from "./modules/security/security.module";
import { UsersModule } from "./modules/users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    UsersModule,
    SecurityModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
