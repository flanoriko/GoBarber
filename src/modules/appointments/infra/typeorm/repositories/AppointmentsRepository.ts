import ICreateAppoinmentDTO from '@modules/appointments/dto/ICreateAppointmentDTO';
import iFindAllInDayFromProviderDTO from '@modules/appointments/dto/iFindAllInDayFromProviderDTO';
import iFindAllInMonthFromProviderDTO from '@modules/appointments/dto/iFindAllInMonthFromProviderDTO';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { getRepository, Repository, Raw } from 'typeorm';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });
    return findAppointment;
  }

  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppoinmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({
      provider_id,
      user_id,
      date,
    });
    await this.ormRepository.save(appointment);
    return appointment;
  }

  public async findAllInMonthFromProvider({
    month,
    provider_id,
    year,
  }: iFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'MM-YYYY')='${parsedMonth}-${year}' `,
        ),
      },
    });
    return appointments;
  }

  public async findAllInDayFromProvider({
    day,
    month,
    provider_id,
    year,
  }: iFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');
    const parsedDay = String(day).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'DD-MM-YYYY')='${parsedDay}-${parsedMonth}-${year}' `,
        ),
      },
    });
    return appointments;
  }
}

export default AppointmentsRepository;
