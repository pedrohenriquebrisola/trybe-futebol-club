import { IUsersModel } from '../Interfaces/users/IUsers.model';
import { IUsers } from '../Interfaces/users/IUsers';
import SequelizeUser from '../database/models/UsersModel';

export default class UsersModel implements IUsersModel {
  private model = SequelizeUser;

  async findByEmail(email: string): Promise<IUsers | null> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) return null;
    return user;
  }
}
