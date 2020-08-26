import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  // categorizando o tipo com o describe
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const user = await createUserService.execute({
      email: 'flavia.teste@gmail.com',
      password: '123456',
      name: 'Flavia',
    });
    expect(user).toHaveProperty('id');
    expect(user.name).toBe('Flavia');
  });

  it('should not be able to create two users with the same email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUserService.execute({
      email: 'flavia.teste@gmail.com',
      password: '123456',
      name: 'Flavia',
    });
    expect(
      createUserService.execute({
        email: 'flavia.teste@gmail.com',
        password: '1234856',
        name: 'Flavia',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
