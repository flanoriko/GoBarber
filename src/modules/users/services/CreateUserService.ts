import { injectable, inject } from 'tsyringe';

import AppErrors from '@shared/errors/AppError';

import Users from '../infra/typeorm/entities/Users';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUserRepository';

interface IRequest {
  name: string;
  password: string;
  email: string;
} /* DTO que recebe info */

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ name, password, email }: IRequest): Promise<Users> {
    const emailExists = await this.usersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppErrors('Email already used');
    }

    const criptPass = await this.hashProvider.generateHash(password);

    const user = this.usersRepository.create({
      name,
      password: criptPass,
      email,
    });

    return user;
  }
}

export default CreateUserService;
