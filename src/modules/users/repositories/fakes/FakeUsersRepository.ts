// import User from '@modules/Users/infra/typeorm/entities/User';
import ICreateUserDTO from '@modules/users/dto/ICreateUserDTO';
import IUsersRepository from '@modules/users/repositories/IUserRepository';
import { uuid } from 'uuidv4';

import User from '../../infra/typeorm/entities/Users';

class UsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const findUserById = this.users.find(user => user.id === id);
    return findUserById;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUserByEmail = this.users.find(user => user.email === email);
    return findUserByEmail;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);
    this.users[findIndex] = user;
    return user;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(user, { id: uuid() }, userData);
    this.users.push(user);

    return user;
  }
}

export default UsersRepository;
