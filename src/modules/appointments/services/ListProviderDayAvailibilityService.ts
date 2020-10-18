import { getHours, isAfter } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
  day: number;
}
type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    year,
    month,
    day,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      { day, month, provider_id, year },
    );

    const hourStart = 8;
    const eachHourArray = Array.from(
      { length: 10 },
      (value, index) => index + hourStart,
    );
    const currentDate = new Date(Date.now());
    const availability = eachHourArray.map(hour => {
      const appointmentsInHour = appointments.filter(appointment => {
        return getHours(appointment.date) === hour;
      });

      const compareDate = new Date(year, month - 1, day, hour);

      return {
        hour,
        available:
          appointmentsInHour.length === 0 && isAfter(compareDate, currentDate),
      }; // das 08 as 17 tem 9 agendamentos. Se tiver menos que isso, entao tem horarios disponiveis
    });

    return availability;
  }
}

export default ListProviderDayAvailabilityService;
