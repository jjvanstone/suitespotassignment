import { Injectable } from '@nestjs/common';
import { AdminService } from '../admin/admin.service';
import { JwtService } from '@nestjs/jwt';
import { IAccount } from '../core/interfaces';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private jwtService: JwtService
  ) {
    //
  }

  async validateAdmin(username: string, password: string): Promise<any> {
    const admin = await this.adminService.findOne(username);
    if (admin && admin.password === password) {
      // removing password from the result by destructuring the admin object
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = admin;
      return result;
    }

    return null;
  }

  async login({ username, id }: IAccount) {
    const payload = { username, sub: id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
