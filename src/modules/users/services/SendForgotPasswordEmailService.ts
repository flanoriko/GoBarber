import { injectable, inject } from 'tsyringe';

import IMailProvider from '@shared/container/provider/MailProvider/models/IMailProvider';
import AppErrors from '@shared/errors/AppError';
import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/Users';
import IUsersRepository from '../repositories/IUserRepository';
import IUsersTokenRepository from '../repositories/IUserTokensRepository';

interface IRequest {
  email: string;
} /* DTO que recebe info */

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
    @inject('UsersTokenRepository')
    private tokensRepository: IUsersTokenRepository,
  ) {}

  public async execute(data: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(data.email);
    if (!user) {
      throw new AppError('User does not exists');
    }
    await this.tokensRepository.generate(user.id);
    this.mailProvider.sendMail(data.email, 'Pedido de recuperação de senha');
  }
}

export default SendForgotPasswordEmailService;
