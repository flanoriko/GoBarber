import authConfig from '@config/auth';
import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import AppErrors from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/Users';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUserRepository';

interface Request {
  password: string;
  email: string;
} /* DTO que recebe info */
@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    password,
    email,
  }: Request): Promise<{ user: User; token: string }> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppErrors('Invalid Email/Password', 401);
    }

    const PasswordOk = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!PasswordOk) {
      throw new AppErrors('Invalid Email/Password', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;
    // let lsecret = '123';

    // if (!secret) {
    //   lsecret = '123';
    // } else {
    //   lsecret = secret;
    // }
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}

export default AuthenticateUserService;
