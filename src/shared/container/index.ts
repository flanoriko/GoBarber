import '@modules/users/providers';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import IUsersRepository from '@modules/users/repositories/IUserRepository';
import IUsersTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import { container } from 'tsyringe';

import './provider';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository', // qq norme que vc queira
  AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository', // qq norme que vc queira
  UsersRepository,
);

container.registerSingleton<IUsersTokensRepository>(
  'UserTokensRepository', // qq norme que vc queira
  UserTokensRepository,
);

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository', // qq norme que vc queira
  NotificationsRepository,
);
