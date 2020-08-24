import UpdateUserAvatarService from '@modules/users/services/UploadUserAvatarService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
// index, show, create, update, delete

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const uploadUserAvatar = container.resolve(UpdateUserAvatarService);
    const user = await uploadUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });
    delete user.password;

    return response.json(user);
  }
}
