import { date } from 'date-fns/locale/af';

import AppError from '@shared/errors/AppError';

import FakeNotificationRepository from '../../notifications/repositories/fakes/fakeNotifficationsRepository';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationRepository: FakeNotificationRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationRepository = new FakeNotificationRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationRepository,
    );
  });
  // categorizando o tipo com o describe
  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 12, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 12, 13),
      user_id: '123',
      provider_id: '123123',
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123');
  });

  it('should not be able to create two appointments on the same date/hour', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 12, 12).getTime();
    });

    const appointmentDate = new Date(2020, 4, 12, 15);
    // const appointmentDate = new Date();
    await createAppointment.execute({
      date: appointmentDate,
      user_id: '123',
      provider_id: '123123',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: '123',
        provider_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new appointment in a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 12, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 12, 11),
        user_id: '123',
        provider_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a appointment with same user_id and provider_id', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 12, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 12, 11),
        user_id: '123',
        provider_id: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a appointment after 17', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 12, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 12, 19),
        user_id: '123',
        provider_id: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a appointment before 8', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 12, 1).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 12, 5),
        user_id: '123',
        provider_id: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
