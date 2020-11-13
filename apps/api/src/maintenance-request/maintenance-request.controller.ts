import { Body, Controller, Post, Get, Param, UseGuards } from '@nestjs/common';
import {
  MaintenanceRequest,
  MaintenanceRequestStatus,
  ServiceType,
} from '@suiteportal/api-interfaces';
import { MaintenanceRequestService } from './maintenance-request.service';
import { IsNotEmpty, IsEmail } from 'class-validator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

// Uses package class-validator & class-transformer to help out with validation
// from (https://docs.nestjs.com/techniques/validation)
class MaintenanceRequestDTO implements MaintenanceRequest {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  unitNumber: string;

  @IsNotEmpty()
  serviceType: ServiceType;

  @IsNotEmpty()
  summary: string;

  status?: MaintenanceRequestStatus;

  details?: string;
}

class GetByIdParams {
  @IsNotEmpty()
  id: string;
}

class ToggleStatusParams {
  @IsNotEmpty()
  id: string;
}

@Controller('maintenance-requests')
export class MaintenanceRequestController {
  constructor(
    private readonly maintenanceRequestService: MaintenanceRequestService
  ) {
    //
  }

  @Post('/')
  public async createMaintenanceRequest(
    @Body() maintenanceRequest: MaintenanceRequestDTO
  ) {
    return await this.maintenanceRequestService.createMaintenanceRequest(
      maintenanceRequest
    );
  }

  @Get('/:id')
  public async getMaintenanceRequest(@Param() { id }: GetByIdParams) {
    return await this.maintenanceRequestService.getMaintenanceRequest(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id/close')
  public async toggleStatus(@Param() { id }: ToggleStatusParams) {
    return await this.maintenanceRequestService.closeMaintenanceRequestStatus(
      id
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  public async getMaintenanceRequests() {
    return await this.maintenanceRequestService.getMaintenanceRequests();
  }
}
