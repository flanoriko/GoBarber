import { Router } from 'express';
import CreateUserSession from '../services/AuthenticateUserService';
const sessionRouter = Router();

sessionRouter.post('/', async (request, response) => {
 try{
  const { email, password } = request.body; 

   const createSession = new CreateUserSession();

   const {user,token} = await createSession.execute({ email , password});
   
   return response.json({user, token});//json({userCreated});
  }
  catch (err) {
    return response
       .status(400)
     .json({ error: err.message });
  }
});

export default sessionRouter;
