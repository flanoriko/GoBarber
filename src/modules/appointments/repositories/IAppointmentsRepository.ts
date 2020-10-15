import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

import ICreateAppoinmentDTO from '../dto/ICreateAppointmentDTO';
import iFindAllProvidersDTO from '../dto/iFindAllInMonthFromProviderDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppoinmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllInMonthFromProvider(
    data: iFindAllProvidersDTO,
  ): Promise<Appointment[]>;
}
