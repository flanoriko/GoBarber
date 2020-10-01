import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfileService = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  // categorizando o tipo com o describe
  it('should be able to change update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Flavia',
      password: '123',
      email: 'flavia@gmail.com',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'John',
      email: 'john@gmail.com',
      // password: (await user).password,
    });
    expect(updatedUser.name).toBe('John');
    expect(updatedUser.email).toBe('john@gmail.com');
  });

  // categorizando o tipo com o describe
  it('should not change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'Flavia',
      password: '123',
      email: 'flavia@gmail.com',
    });
    const user = await fakeUsersRepository.create({
      name: 'Andre',
      password: '1456423',
      email: 'andre@gmail.com',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'John',
        email: 'flavia@gmail.com',
        // password: (await user).password,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('user does not exist!', async () => {
    await expect(
      updateProfileService.execute({
        user_id: 'fake_id',
        name: 'John',
        email: 'flavia@gmail.com',
        // password: (await user).password,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Flavia',
      password: '123',
      email: 'flavia@gmail.com',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'John',
      old_password: '123',
      password: '3333',
      email: 'john@gmail.com',
      // password: (await user).password,
    });
    expect(updatedUser.password).toBe('3333');
  });

  it('should not be able to update the password if old password is not informed', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Flavia',
      password: '123',
      email: 'flavia@gmail.com',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'John',
        password: '3333',
        email: 'john@gmail.com',
        // password: (await user).password,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Flavia',
      password: '123',
      email: 'flavia@gmail.com',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'John',
      old_password: '454545',
      password: '3333',
      email: 'john@gmail.com',
      // password: (await user).password,
    });
    expect(updatedUser.password).toBe('3333');
  });

  it('should not be able to update the profile from non-existing user', async () => {
    expect(
      updateProfileService.execute({
        user_id: 'non-existent id',
        name: 'Flavia',
        password: '123',
        email: 'flavia@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
