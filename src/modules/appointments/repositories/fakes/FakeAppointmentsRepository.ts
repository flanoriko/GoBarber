import ICreateAppoinmentDTO from '@modules/appointments/dto/ICreateAppointmentDTO';
import iFindAllInDayFromProviderDTO from '@modules/appointments/dto/iFindAllInDayFromProviderDTO';
import iFindAllInMonthFromProviderDTO from '@modules/appointments/dto/iFindAllInMonthFromProviderDTO';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { isEqual, getMonth, getYear, getDate } from 'date-fns';
import { uuid } from 'uuidv4';

import Appointment from '../../infra/typeorm/entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );
    return findAppointment;
  }

  public async findAllInMonthFromProvider({
    month,
    provider_id,
    year,
  }: iFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    );
    return appointments;
  }

  public async findAllInDayFromProvider({
    day,
    month,
    provider_id,
    year,
  }: iFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year &&
        getDate(appointment.date) === day,
    );
    return appointments;
  }

  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppoinmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, user_id, provider_id });
    this.appointments.push(appointment);
    return appointment;
  }
}

export default AppointmentsRepository;
