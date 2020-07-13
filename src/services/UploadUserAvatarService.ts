import User from '../models/Users';
import { getRepository } from 'typeorm';
import pathFile from '../config/upload';
import path from 'path';
import fs from 'fs';
import AppErrors from '../errors/AppError';

interface Request {
    user_id: string;
    avatarFilename: string;
}
class UpdateAvatarService {

    public async execute({ user_id, avatarFilename }: Request): Promise<User> {
        const usersRepository = getRepository(User);
        const user = await usersRepository.findOne(user_id);

        //validando se o usuario existe:
        if (!user) {
            throw new AppErrors('User is not registered',401);
        }

        if (user.avatar) {
            const userAvatarFilePath = path.join(pathFile.directory, user.avatar);
            const userAvatarExists = await fs.promises.stat(userAvatarFilePath); //ve status

            if (userAvatarExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFilename;
        await usersRepository.save(user); //se o usuario ja está no banco, ele atualiza

        return user;
    }

}

export default UpdateAvatarService;