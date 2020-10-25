import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/provider/CacheProvider/models/ICacheProvider';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
  day: number;
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    provider_id,
    year,
    month,
    day,
  }: IRequest): Promise<Appointment[]> {
    const key = `provider-appointments:${provider_id}:${year}-${month}-${day}`;

    let appointments = await this.cacheProvider.recover<Appointment[]>(key);

    if (!appointments) {
      appointments = await this.appointmentsRepository.findAllInDayFromProvider(
        { provider_id, year, month, day },
      );
      await this.cacheProvider.save(key, appointments);
    }

    // await this.cacheProvider.save('asd', 'asd');
    return appointments;
  }
}

export default ListProviderAppointmentsService;
