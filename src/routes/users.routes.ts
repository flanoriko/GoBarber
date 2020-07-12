import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';

const userRouter = Router();

userRouter.post('/', async (request, response) => {
 try{
  const { name, email, password, date } = request.body;
   const createUserService = new CreateUserService();
   const userCreated = await createUserService.execute({name, password, email});
   delete userCreated.password;
   return response.json(userCreated);//json({userCreated});
  }
  catch (err) {
    return response
       .status(400)
     .json({ error: err.message });
  }
});

export default userRouter;
