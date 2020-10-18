import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

import ICreateAppoinmentDTO from '../dto/ICreateAppointmentDTO';
import iFindAllInDayFromProviderDTO from '../dto/iFindAllInDayFromProviderDTO';
import iFindAllInMonthFromProviderDTO from '../dto/iFindAllInMonthFromProviderDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppoinmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllInMonthFromProvider(
    data: iFindAllInMonthFromProviderDTO,
  ): Promise<Appointment[]>;
  findAllInDayFromProvider(
    data: iFindAllInDayFromProviderDTO,
  ): Promise<Appointment[]>;
}
