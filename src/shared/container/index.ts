import '@modules/users/providers';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import IUsersRepository from '@modules/users/repositories/IUserRepository';
import IUsersTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import { container } from 'tsyringe';

import './provider';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
// import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository', // qq norme que vc queira
  AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository', // qq norme que vc queira
  UsersRepository,
);

// container.registerSingleton<IUsersTokensRepository>(
//   'UserTokensRepository', // qq norme que vc queira
//   UsersTokensRepository,
// );
