import { container } from 'tsyringe';

import EtherealEmailProvider from './MailProvider/implementation/EtherealMailProvider';
import IMailProvider from './MailProvider/models/IMailProvider';
import HandlebarsMailTemplateProvider from './MailTemplateProvider/implementation/HandlebarsMailTemplateProvider';
import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider';
import DiskStorageProvider from './StorageProvider/implementation/DiskStorageProvider';
import IStorageProvider from './StorageProvider/models/IStorageProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider', // qq norme que vc queira
  DiskStorageProvider,
);

container.registerInstance<IMailTemplateProvider>(
  'MailTemplateProvider', // qq norme que vc queira
  new HandlebarsMailTemplateProvider(),
);

container.registerInstance<IMailProvider>(
  'MailProvider', // qq norme que vc queira
  container.resolve(EtherealEmailProvider),
);
