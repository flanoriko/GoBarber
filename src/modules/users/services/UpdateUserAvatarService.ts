import User from '@modules/users/infra/typeorm/entities/Users';
import { injectable, inject } from 'tsyringe';

import IStoragePRovider from '@shared/container/provider/StorageProvider/models/IStorageProvider';
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
    @inject('StorageProvider')
    private storageProvider: IStoragePRovider,
  ) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    // validando se o usuario existe:
    if (!user) {
      throw new AppErrors('User is not registered', 401);
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }
    const filename = await this.storageProvider.saveFile(avatarFilename);

    user.avatar = filename;
    await this.usersRepository.save(user); // se o usuario ja está no banco, ele atualiza

    return user;
  }
}

export default UpdateAvatarService;
