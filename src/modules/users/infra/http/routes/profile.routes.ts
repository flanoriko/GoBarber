import ensureAuthentication from '@modules/users/infra/http/middleware/ensureAuth';
import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import ProFileController from '../controllers/ProfileController';

const profileRouter = Router();
const profileController = new ProFileController();

profileRouter.use(ensureAuthentication);
profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      name: Joi.string().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  profileController.update,
);
profileRouter.get('/', profileController.show);

export default profileRouter;
