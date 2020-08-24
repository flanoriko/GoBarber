import pathFile from '@config/upload';
import User from '@modules/users/infra/typeorm/entities/Users';
import fs from 'fs';
import path from 'path';
import { injectable, inject } from 'tsyringe';

import AppErrors from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUserRepository';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}
@injectable()
class UpdateAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    // validando se o usuario existe:
    if (!user) {
      throw new AppErrors('User is not registered', 401);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(pathFile.directory, user.avatar);
      const userAvatarExists = await fs.promises.stat(userAvatarFilePath); // ve status

      if (userAvatarExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;
    await this.usersRepository.save(user); // se o usuario ja está no banco, ele atualiza

    return user;
  }
}

export default UpdateAvatarService;
