import * as bcrypt from 'bcryptjs';

import { IUsersModel } from '../Interfaces/users/IUsers.model';
import {
  ServiceMessage,
  ServiceResponse,
} from '../Interfaces/ServicesResponse';
import JWT from '../utils/JWT';
import UsersModel from '../models/UsersModels';
// prettier-ignore
export default class UserService {
  constructor(
    private userModel: IUsersModel = new UsersModel(),
    private jwtService = JWT,
  ) {}
  // prettier-ignore

  public async login(emailUser: string, password: string):
  Promise<ServiceResponse<ServiceMessage | { token: string }>> {
    const user = await this.userModel.findByEmail(emailUser);
    if (user) {
      if (!bcrypt.compareSync(password, user.password)) {
        return {
          status: 'INVALID_DATA',
          data: { message: 'Invalid email or password' },
        };
      }
      const { email } = user;
      const token = this.jwtService.sign({ email });
      return { status: 'SUCCESSFUL', data: { token } };
    }
    return {
      status: 'INVALID_DATA',
      data: { message: 'Invalid email or password' },
    };
  }

  public async loginRole(emailUser: string):
  Promise<ServiceResponse<{ role: string | undefined }>> {
    const user = await this.userModel.findByEmail(emailUser);
    return { status: 'SUCCESSFUL', data: { role: user?.role } };
  }
}
