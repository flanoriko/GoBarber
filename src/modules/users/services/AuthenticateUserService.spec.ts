import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUserService', () => {
  // categorizando o tipo com o describe
  it('should be able to authenticate user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const authUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    await createUserService.execute({
      email: 'flavia.teste@gmail.com',
      password: '123456',
      name: 'Flavia',
    });

    const userAthenticated = await authUserService.execute({
      email: 'flavia.teste@gmail.com',
      password: '123456',
    });
    expect(userAthenticated).toHaveProperty('token');
  });

  it('user does not exists', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    expect(
      authUserService.execute({
        email: 'flavia.teste@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('invalid password ', async () => {
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

    const authUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    expect(
      authUserService.execute({
        email: 'flavia.teste@gmail.com',
        password: '1231456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
