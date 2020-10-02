import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;

let listProvidersService: ListProvidersService;

describe('ListProvider', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
  });
  // categorizando o tipo com o describe
  it('should be able to list providers', async () => {
    const user_logado = await fakeUsersRepository.create({
      name: 'Flavia',
      password: '123',
      email: 'flavia@gmail.com',
    });

    const user1 = await fakeUsersRepository.create({
      name: 'Yuri',
      password: '123',
      email: 'yuri@gmail.com',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Milda',
      password: '123',
      email: 'Milda@gmail.com',
    });

    const providers = await listProvidersService.execute({
      user_id: user_logado.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
