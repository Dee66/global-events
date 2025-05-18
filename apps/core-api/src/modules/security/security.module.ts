import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { RolesGuard } from './roles.guard';
import { ProtectedController } from './protected.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthGuard, RolesGuard],
  controllers: [ProtectedController],
  exports: [AuthGuard, RolesGuard],
})
export class SecurityModule {}