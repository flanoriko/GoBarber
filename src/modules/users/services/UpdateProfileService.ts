import User from '@modules/users/infra/typeorm/entities/Users';
import { injectable, inject } from 'tsyringe';

import AppErrors from '@shared/errors/AppError';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUserRepository';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}
@injectable()
class UpdateProfile {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    old_password,
    password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    // validando se o usuario existe:
    if (!user) {
      throw new AppErrors('User is not registered', 401);
    }
    if (
      password &&
      old_password &&
      this.hashProvider.compareHash(user.password, old_password)
    ) {
      user.password = await this.hashProvider.generateHash(password);
    }

    user.name = name;
    user.email = email;
    return this.usersRepository.save(user);
  }
}

export default UpdateProfile;
