import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/HTTPStatus';
import UserService from '../services/UserServices';
import JWT from '../utils/JWT';

export default class UserController {
  constructor(private UsersService = new UserService()) {}

  public async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const serviceResponse = await this.UsersService.login(email, password);
    return res
      .status(mapStatusHTTP(serviceResponse.status))
      .json(serviceResponse.data);
  }

  public async loginRole(req: Request, res: Response): Promise<Response> {
    const token = req.headers.authorization;
    const tokenUp = token?.split(' ')[1];
    const validToken = (await JWT.verify(tokenUp as string)) as {
      email: string;
    };
    const serviceResponse = await this.UsersService.loginRole(validToken.email);
    return res.status(200).json(serviceResponse.data);
  }
}
