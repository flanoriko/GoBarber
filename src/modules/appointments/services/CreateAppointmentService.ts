import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import ICacheProvider from '@shared/container/provider/CacheProvider/models/ICacheProvider';
import AppErrors from '@shared/errors/AppError';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  user_id: string;
  date: Date;
} /* DTO que recebe info */

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    provider_id,
    user_id,
    date,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);
    const findAppointmentIsSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentIsSameDate) {
      throw new AppErrors('Já existe agendamento para este horario');
    }

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppErrors(
        'Não é possível criar um agendamento em hora passada.',
      );
    }

    if (user_id === provider_id) {
      throw new AppErrors(
        'Não pode criar um agendamento com seu proprio login para vc mesmo!',
      );
    }
    const appointmentHour = getHours(appointmentDate);
    if (appointmentHour < 8 || appointmentHour > 17) {
      throw new AppErrors('Fora do horario comercial.');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    const dateFormatted = format(appointment.date, "dd/MM/yyyy 'às' HH:mm");

    await this.notificationsRepository.create({
      content: `Novo agendamento para o dia ${dateFormatted}`,
      recipient_id: provider_id,
    });

    await this.cacheProvider.invalidate(
      `provider-appointments:${provider_id}:${format(
        appointmentDate,
        'yyyy-M-d',
      )}`,
    );
    return appointment;
  }
}

export default CreateAppointmentService;
