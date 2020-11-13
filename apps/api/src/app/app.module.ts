import { Module } from '@nestjs/common';
import { AdminModule } from '../admin/admin.module';
import { AuthModule } from '../auth/auth.module';
import { MaintenanceRequestModule } from '../maintenance-request/maintenance-request.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [MaintenanceRequestModule, AdminModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
