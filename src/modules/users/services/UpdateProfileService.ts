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
class UpdateProfileService {
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
    const email_already_used_by_another_user = await this.usersRepository.findByEmail(
      email,
    );

    if (
      email_already_used_by_another_user &&
      email_already_used_by_another_user.id !== user_id
    ) {
      throw new AppErrors('Email already in use!', 401);
    }
    // validando se o usuario existe:
    if (!user) {
      throw new AppErrors('User is not registered', 401);
    }

    if (password && !old_password) {
      throw new AppErrors('Old Password must be informed', 401);
    }

    if (password && old_password) {
      if (this.hashProvider.compareHash(user.password, old_password)) {
        user.password = await this.hashProvider.generateHash(password);
      }
    }

    user.name = name;
    user.email = email;
    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
