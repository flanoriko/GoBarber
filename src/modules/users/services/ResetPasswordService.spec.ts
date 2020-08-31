import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import ResetPasswordService from './ResetPasswordService';

let fakeUsersRepository: FakeUsersRepository; // sempre criar um novo. NÃO USAR O NEW!!!
let resetPassword: ResetPasswordService;
let fakeUserTokenRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokenRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();
    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokenRepository,
      fakeHashProvider,
    );
  });
  // categorizando o tipo com o describe
  it('should be able to reset a password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'flavia.teste@gmail.com',
      name: 'Flavia',
      password: '123456',
    });
    const { token } = await fakeUserTokenRepository.generate(user.id);
    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');
    await resetPassword.execute({
      password: '123123',
      token,
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);
    expect(updatedUser?.password).toBe('123123'); /// vendo se ta nulo
    expect(generateHash).toHaveBeenCalledWith('123123');
  });

  it('should not be able to reset a password with non-existing token', async () => {
    await expect(
      resetPassword.execute({ token: 'invalid token', password: '123123' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset a password with non-existing token', async () => {
    const { token } = await fakeUserTokenRepository.generate('inexistent user');

    await expect(
      resetPassword.execute({ token, password: '123123' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset after two hours', async () => {
    const user = await fakeUsersRepository.create({
      email: 'flavia.teste@gmail.com',
      name: 'Flavia',
      password: '123456',
    });
    const { token } = await fakeUserTokenRepository.generate(user.id);
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();
      return customDate.setHours(customDate.getHours() + 3);
    });
    await expect(
      resetPassword.execute({
        password: '123123',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
