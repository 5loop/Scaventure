import { Router } from 'express';
import * as AuthenticationController from './controller';
import passport from 'passport';
import { requireJwtAuth } from '../../utils/requireJwtAuth';

// Middleware to require login/auth
const requireLogin = passport.authenticate('local', { session: false });

const routes = new Router();

routes.post('/auth/register', AuthenticationController.register); 
routes.post('/auth/login', requireLogin, AuthenticationController.login);
routes.post('/auth/update', requireJwtAuth, AuthenticationController.update);
routes.get('/auth/confirmation/:token', AuthenticationController.confirmation);
routes.post('/auth/resendToken', AuthenticationController.resendToken);

routes.post('/auth/forgot_password', AuthenticationController.forgot_password);
routes.get('/auth/forgot_password', AuthenticationController.render_forgot_password_template)

routes.post('/auth/reset_password', AuthenticationController.reset_password);
routes.get('/auth/reset_password', AuthenticationController.render_reset_password_template);

export default routes;