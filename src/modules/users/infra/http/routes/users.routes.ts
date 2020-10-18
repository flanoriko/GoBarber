import configMulter from '@config/upload';
import ensureAuthentication from '@modules/users/infra/http/middleware/ensureAuth';
import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';
import multer from 'multer';

import UserAvatarController from '../controllers/UserAvatarController';
import UsersController from '../controllers/UsersController';

const userRouter = Router();

const upload = multer(configMulter);
const userAvatarController = new UserAvatarController();
const usersController = new UsersController();
userRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

userRouter.patch(
  '/avatar',
  ensureAuthentication,
  upload.single('avatar'),
  userAvatarController.update,
);

export default userRouter;
