import { Router } from 'express';

import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
passwordRouter.post('/forgot', forgotPasswordController.create);

const resetPasswordController = new ResetPasswordController();
passwordRouter.post('/reset', resetPasswordController.create);
export default passwordRouter;
