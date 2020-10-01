import CreateUserService from '@modules/users/services/CreateUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
// index, show, create, update, delete

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password } = request.body;
      const createUserService = container.resolve(CreateUserService);
      const userCreated = await createUserService.execute({
        name,
        password,
        email,
      });
      // delete userCreated.password;
      return response.json(userCreated); // json({userCreated});
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
