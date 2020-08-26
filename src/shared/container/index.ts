import '@modules/users/providers';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import IUsersRepository from '@modules/users/repositories/IUserRepository';
import { container } from 'tsyringe';

import './provider';
import UsersRepository from '../../modules/users/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository', // qq norme que vc queira
  AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository', // qq norme que vc queira
  UsersRepository,
);
