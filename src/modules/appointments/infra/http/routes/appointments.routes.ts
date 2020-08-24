import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController';
import ensureAuthentication from '@modules/users/infra/http/middleware/ensureAuth';
import { Router } from 'express';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(ensureAuthentication);
appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
