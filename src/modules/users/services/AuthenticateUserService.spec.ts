import FakeCacheProvider from '@shared/container/provider/CacheProvider/fakes/FakeCacheProvider';
import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeCacheProvider: FakeCacheProvider;

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;
let authUserService: AuthenticateUserService;

describe('AuthenticateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
    authUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  // categorizando o tipo com o describe
  it('should be able to authenticate user', async () => {
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
    await expect(
      authUserService.execute({
        email: 'flavia.teste@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('invalid password ', async () => {
    await createUserService.execute({
      email: 'flavia.teste@gmail.com',
      password: '123456',
      name: 'Flavia',
    });

    await expect(
      authUserService.execute({
        email: 'flavia.teste@gmail.com',
        password: '1231456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
