import { container } from 'tsyringe';

import HandlebarsMailTemplateProvider from './implementation/HandlebarsMailTemplateProvider';
import IMailTemplateProvider from './models/IMailTemplateProvider';

const providers = {
  handlebars: HandlebarsMailTemplateProvider,
};

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider', // qq norme que vc queira
  providers.handlebars,
);
