import iFindAllProvidersDTO from '@modules/appointments/dto/iFindAllProvidersDTO';

import ICreateUserDTO from '../dto/ICreateUserDTO';
import User from '../infra/typeorm/entities/Users';

export default interface IUserRepository {
  findAllProviders(data: iFindAllProvidersDTO): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
