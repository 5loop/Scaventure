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

export default routes;