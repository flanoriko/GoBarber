import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController';
import ensureAuthentication from '@modules/users/infra/http/middleware/ensureAuth';
import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

// appointmentsRouter.use(ensureAuthentication);
appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date(),
    },
  }),
  appointmentsController.create,
);
appointmentsRouter.get('/me', providerAppointmentsController.index);

export default appointmentsRouter;
