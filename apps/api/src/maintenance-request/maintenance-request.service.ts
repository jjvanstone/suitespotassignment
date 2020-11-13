import { Injectable } from '@nestjs/common';
import {
  MaintenanceRequest,
  MaintenanceRequestStatus,
} from '@suiteportal/api-interfaces';
import {
  MaintenanceRequestDao,
  MaintenanceRequestDB,
} from './maintenance-request.dao';

@Injectable()
export class MaintenanceRequestService {
  constructor(private readonly maintReqDao: MaintenanceRequestDao) {
    //
  }

  async createMaintenanceRequest(maintenanceRequest: MaintenanceRequest) {
    maintenanceRequest.status = MaintenanceRequestStatus.OPEN;
    return await this.maintReqDao.insertNewRequest(maintenanceRequest);
  }

  async getMaintenanceRequest(id: string): Promise<MaintenanceRequestDB> {
    return await this.maintReqDao.getMaintenanceRequest(id);
  }

  async getMaintenanceRequests(): Promise<MaintenanceRequestDB> {
    return this.maintReqDao.getMaintenanceRequests();
  }

  async closeMaintenanceRequestStatus(
    id: string
  ): Promise<MaintenanceRequestDB> {
    return this.maintReqDao.closeMaintenanceRequest(id);
  }
}
