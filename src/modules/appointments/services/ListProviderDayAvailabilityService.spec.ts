import { date } from 'date-fns/locale/af';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailibilityService from './ListProviderDayAvailibilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;

let listProviderDayAvailibilityService: ListProviderDayAvailibilityService;

describe('listDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailibilityService = new ListProviderDayAvailibilityService(
      fakeAppointmentsRepository,
    );
  });
  // categorizando o tipo com o describe
  it('should be able to list the day availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 14, 0, 0),
      provider_id: 'flavia',
      user_id: '123',
    });
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 15, 0, 0),
      provider_id: 'flavia',
      user_id: '123',
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 11).getTime();
    });

    const availability = await listProviderDayAvailibilityService.execute({
      provider_id: 'flavia',
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 13, available: true },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 16, available: true },
      ]),
    );
  });
});
