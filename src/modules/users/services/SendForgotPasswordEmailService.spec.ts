import FakeMailProvider from '@shared/container/provider/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository; // sempre criar um novo. NÃO USAR O NEW!!!
let fakeMailProvider: FakeMailProvider;
let fakeUserTokenRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokenRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokenRepository,
    );
  });
  // categorizando o tipo com o describe
  it('should be able to send an email with a password reset', async () => {
    await fakeUsersRepository.create({
      email: 'flavia.teste@gmail.com',
      name: 'Flavia',
      password: '123456',
    });
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    await sendForgotPasswordEmail.execute({
      email: 'flavia.teste@gmail.com',
    });
    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover a non-existent user password', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'flavia.teste@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokenRepository, 'generate');

    const user = await fakeUsersRepository.create({
      email: 'flavia.teste@gmail.com',
      name: 'Flavia',
      password: '123456',
    });
    await sendForgotPasswordEmail.execute({
      email: 'flavia.teste@gmail.com',
    });
    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
