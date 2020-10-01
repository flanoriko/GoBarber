import configMulter from '@config/upload';
import ensureAuthentication from '@modules/users/infra/http/middleware/ensureAuth';
import { Router } from 'express';
import multer from 'multer';

import ProFileController from '../controllers/ProfileController';

const profileRouter = Router();
const profileController = new ProFileController();

profileRouter.use(ensureAuthentication);
profileRouter.put('/', profileController.update);
profileRouter.get('/', profileController.show);

export default profileRouter;
