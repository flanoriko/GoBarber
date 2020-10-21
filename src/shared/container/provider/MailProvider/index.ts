import mailConfig from '@config/mail';
import { container } from 'tsyringe';

import EtherealMailProvider from './implementation/EtherealMailProvider';
import SESMailProvider from './implementation/SESMailProvider';
import IMailProvider from './models/IMailProvider';

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider', // qq norme que vc queira
  providers[mailConfig.driver],
);
