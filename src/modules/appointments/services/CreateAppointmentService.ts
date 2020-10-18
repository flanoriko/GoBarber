import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import { startOfHour, isBefore, getHours } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import AppErrors from '@shared/errors/AppError';
import AppError from '@shared/errors/AppError';

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

    return appointment;
  }
}

export default CreateAppointmentService;
