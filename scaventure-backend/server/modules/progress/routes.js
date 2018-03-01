import { Router } from 'express';
import * as ProgressController from './controller';
import passport from 'passport';
import { requireJwtAuth } from '../../utils/requireJwtAuth';

const routes = new Router();

routes.post('/progress', requireJwtAuth, ProgressController.progress); 
routes.get('/progress/:id', requireJwtAuth, ProgressController.getAllProgress); 

export default routes;