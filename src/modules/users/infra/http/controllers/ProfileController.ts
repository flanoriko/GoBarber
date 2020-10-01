import showProfileService from '@modules/users/services/ShowProfileService';
import updateProfileService from '@modules/users/services/UpdateProfileService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ProFileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const showProfile = container.resolve(showProfileService);
    const user = await showProfile.execute({ user_id });
    delete user.password;
    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, email, old_password, password } = request.body;

    const updateProfile = container.resolve(updateProfileService);
    const user = await updateProfile.execute({
      user_id,
      email,
      name,
      old_password,
      password,
    });
    console.log(user);
    delete user.password;
    return response.json(user);
  }
}
