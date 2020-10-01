import User from '@modules/users/infra/typeorm/entities/Users';
import { injectable, inject } from 'tsyringe';

import AppErrors from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUserRepository';

interface IRequest {
  user_id: string;
}
@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppErrors('User not Found', 401);
    }
    return user;
  }
}

export default ShowProfileService;
