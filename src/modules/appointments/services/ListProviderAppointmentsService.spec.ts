import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;

let listProviderAppointmentsService: ListProviderAppointmentsService;

describe('listProviderAppointmentsService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointmentsService = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
    );
  });
  // categorizando o tipo com o describe
  it('should be able to list the appointments in a day', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 4, 20, 11).getTime();
    });
    const appointment1 = await fakeAppointmentsRepository.create({
      date: new Date(2020, 12, 9, 14, 0, 0),
      provider_id: 'provider_id',
      user_id: '123',
    });
    const appointment2 = await fakeAppointmentsRepository.create({
      date: new Date(2020, 12, 9, 15, 0, 0), // ano mes dia hora minuto e segundo
      provider_id: 'provider_id',
      user_id: '123',
    });

    const appointments = await listProviderAppointmentsService.execute({
      provider_id: 'provider_id',
      year: 2021,
      month: 1,
      day: 9,
    });
    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
