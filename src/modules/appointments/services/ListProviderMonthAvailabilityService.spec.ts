import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeUsersRepository: FakeUsersRepository;

let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailabilityService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });
  // categorizando o tipo com o describe
  it('should be able to list the month availability from provider', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Yuri',
      password: '123',
      email: 'yuri@gmail.com',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Milda',
      password: '123',
      email: 'Milda@gmail.com',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 8, 0, 0),
      provider_id: user1.id,
      user_id: '123',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 9, 0, 0),
      provider_id: user1.id,
      user_id: '123',
    });
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 10, 0, 0),
      provider_id: user1.id,
      user_id: '123',
    });
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 11, 0, 0),
      provider_id: user1.id,
      user_id: '123',
    });
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 12, 0, 0),
      provider_id: user1.id,
      user_id: '123',
    });
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 13, 0, 0),
      provider_id: user1.id,
      user_id: '123',
    });
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 14, 0, 0),
      provider_id: user1.id,
      user_id: '123',
    });
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 15, 0, 0),
      provider_id: user1.id,
      user_id: '123',
    });
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 16, 0, 0),
      provider_id: user1.id,
      user_id: '123',
    });
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 17, 0, 0),
      provider_id: user1.id,
      user_id: '123',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 21, 17, 0, 0),
      provider_id: user1.id,
      user_id: '123',
    });
    // console.log(fakeAppointmentsRepository);
    const listMonthAvailability = await listProviderMonthAvailabilityService.execute(
      {
        provider_id: user1.id,
        year: 2020,
        month: 5,
      },
    );

    expect(listMonthAvailability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 22, available: true },
      ]),
    );
  });
});
