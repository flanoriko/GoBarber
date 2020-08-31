import AppError from '@shared/errors/AppError';

import userRouter from '../infra/http/routes/users.routes';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfile from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfile;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfileService = new UpdateProfile(
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
});
