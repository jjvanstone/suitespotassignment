import { Injectable } from '@nestjs/common';
import { IAccount } from '../core/interfaces';

@Injectable()
export class AdminService {
  private readonly accounts: IAccount[] = [
    {
      id: 1,
      username: 'admin1',
      password: 'admin',
    },
    {
      id: 2,
      username: 'admin2',
      password: 'password',
    },
  ];

  async findOne(username: string): Promise<IAccount | null> {
    return this.accounts.find((account) => account.username === username);
  }
}
