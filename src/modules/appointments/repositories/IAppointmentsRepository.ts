import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

import ICreateAppoinmentDTO from '../dto/ICreateAppointmentDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppoinmentDTO): Promise<Appointment>;

  findByDate(date: Date): Promise<Appointment | undefined>;
}
