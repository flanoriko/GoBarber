import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';
import ensureAuthentication from '../middleware/ensureAuth';
import multer from 'multer';
import configMulter from '../config/upload';
import UpdateUserAvatarService from '../services/UploadUserAvatarService';

const userRouter = Router();

const upload = multer(configMulter);

userRouter.post('/', async (request, response) => {
  try {
    const { name, email, password, date } = request.body;
    const createUserService = new CreateUserService();
    const userCreated = await createUserService.execute({ name, password, email });
    delete userCreated.password;
    return response.json(userCreated);//json({userCreated});
  }
  catch (err) {
    return response
      .status(400)
      .json({ error: err.message });
  }
});


userRouter.patch('/avatar', ensureAuthentication,
  upload.single('avatar'),
  async (request, response) => {

    const uploadUserAvatar = new UpdateUserAvatarService();
    const user = await uploadUserAvatar.execute(
      {
        user_id: request.user.id,
        avatarFilename: request.file.filename
      }
    );
    delete user.password;

    return response.json(user);


  })



export default userRouter;
