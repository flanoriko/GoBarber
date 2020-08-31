import FakeStorageProvider from '@shared/container/provider/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateAvatarService from './UpdateUserAvatarService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateAvatarService: UpdateAvatarService;

describe('UpdateAvatarService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateAvatarService = new UpdateAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });
  // categorizando o tipo com o describe
  it('should be able to change avatar', async () => {
    const user = fakeUsersRepository.create({
      name: 'Flavia',
      password: '123',
      email: 'flavia@gmail.com',
    });
    await updateAvatarService.execute({
      user_id: (await user).id,
      avatarFilename: 'teste_imagem_qq.jpg',
    });
    expect((await user).avatar).toBe('teste_imagem_qq.jpg');
  });

  it('should not update if user not exists', async () => {
    await expect(
      updateAvatarService.execute({
        user_id: 'invalid_user',
        avatarFilename: 'teste_imagem_qq.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete avatar if it exists', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = fakeUsersRepository.create({
      name: 'Flavia',
      password: '123',
      email: 'flavia@gmail.com',
    });
    await updateAvatarService.execute({
      user_id: (await user).id,
      avatarFilename: 'teste_imagem_qq.jpg',
    });

    await updateAvatarService.execute({
      user_id: (await user).id,
      avatarFilename: 'teste_imagem_qq_2.jpg',
    });
    expect(deleteFile).toHaveBeenCalledWith('teste_imagem_qq.jpg');
    expect((await user).avatar).toBe('teste_imagem_qq_2.jpg');
  });
});
