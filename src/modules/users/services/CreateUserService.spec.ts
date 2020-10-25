import FakeCacheProvider from '@shared/container/provider/CacheProvider/fakes/FakeCacheProvider';
import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let fakeCacheProvider: FakeCacheProvider;

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });

  // categorizando o tipo com o describe
  it('should be able to create a new user', async () => {
    const user = await createUserService.execute({
      email: 'flavia.teste@gmail.com',
      password: '123456',
      name: 'Flavia',
    });
    expect(user).toHaveProperty('id');
    expect(user.name).toBe('Flavia');
  });

  it('should not be able to create two users with the same email', async () => {
    await createUserService.execute({
      email: 'flavia.teste@gmail.com',
      password: '123456',
      name: 'Flavia',
    });
    await expect(
      createUserService.execute({
        email: 'flavia.teste@gmail.com',
        password: '1234856',
        name: 'Flavia',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
