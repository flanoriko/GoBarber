import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;

let showProfileService: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfileService = new ShowProfileService(fakeUsersRepository);
  });
  // categorizando o tipo com o describe
  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Flavia',
      password: '123',
      email: 'flavia@gmail.com',
    });

    const profile = await showProfileService.execute({
      user_id: user.id,
    });
    expect(profile.name).toBe('Flavia');
    expect(profile.email).toBe('flavia@gmail.com');
  });

  it('should not be able to show the profile from non-existing user', async () => {
    expect(
      showProfileService.execute({
        user_id: 'non-existent id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
