import { getCustomRepository } from 'typeorm';
import { Router } from 'express';
import { parseISO } from "date-fns";
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmenService from '../services/CreateAppointmentService';
import ensureAuthentication from '../middleware/ensureAuth';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthentication);

appointmentsRouter.get('/', async (request, response) => {

  const appointmentRepository = getCustomRepository(AppointmentsRepository);
  const appointmentsAll = await appointmentRepository.find();

  return response.json(appointmentsAll);

})

appointmentsRouter.post('/', async (request, response) => {

  const { provider_id, date } = request.body;
  const parsedDate = parseISO(date);
  const createAppointment = new CreateAppointmenService();

  const appointment = await createAppointment.execute({ provider_id, date: parsedDate });

  return response.json(appointment);

});

export default appointmentsRouter;
