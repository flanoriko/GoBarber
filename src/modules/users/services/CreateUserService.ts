import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import AppErrors from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/Users';
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
  ) {}

  public async execute({ name, password, email }: IRequest): Promise<User> {
    const emailExists = await this.usersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppErrors('Email already used');
    }

    const criptPass = await hash(password, 8);

    const user = this.usersRepository.create({
      name,
      password: criptPass,
      email,
    });

    return user;
  }
}

export default CreateUserService;
