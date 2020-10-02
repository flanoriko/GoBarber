import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController';
import ensureAuthentication from '@modules/users/infra/http/middleware/ensureAuth';
import { Router } from 'express';

const providersRouter = Router();
const providersController = new ProvidersController();

providersRouter.use(ensureAuthentication);
providersRouter.get('/', providersController.index);

export default providersRouter;
