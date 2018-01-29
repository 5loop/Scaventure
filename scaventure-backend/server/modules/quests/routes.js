import { Router } from 'express';
import * as QuestController from './controller';
import passport from 'passport';
import { requireJwtAuth } from '../../utils/requireJwtAuth';

const routes = new Router();

// Quests

// uncomment/comment 'requireJwtAuth' to enable authentication for the routes
routes.get('/quests', requireJwtAuth, QuestController.getQuests);
routes.get('/quests/:id', requireJwtAuth, QuestController.getOneQuest);
routes.post('/quests', requireJwtAuth, QuestController.addQuest);

routes.post('/quests/:id', requireJwtAuth, QuestController.updateQuest);
routes.delete('/quests/:id',  requireJwtAuth, QuestController.deleteQuest);

// TO BE IMPLEMENTED @Parth

// Feedback

// routes.get('/quesst/:id/feedbacks' , ... ); // Get list of feedbacks for a quest
// routes.post('/quests/:id/feedbacks' , ... ); // Add a feedback to a quest
// routes.delete('/quests/:id/feedbacks/:id' , ... ); // delete a feedback (iff it was created by the logged-in user)
// routes.post('/quests/:id/feedbacks/:id' , ... ); // update a feedback (iff it was created by the logged-in user)

// Invitations

// routes.get('/quests/:id/users' , ... ); // Get list of users invited to the quest (iff quest is private & logged-in user is the author of the quest)
// routes.delete('/quests/:id/users/:id', ...); // 'Uninvite' a user (iff quest is private & logged-in user is the author of the quest)


// TO BE IMPLEMENTED @Arpit & @Gaurav

// Quest Steps
routes.get('/quests/:id/steps', requireJwtAuth, QuestController.getQuestSteps);    // get all quest steps
routes.delete('/quests/:id/steps', requireJwtAuth, QuestController.deleteAllStep); // delete all steps that belong to a certain quest
routes.get('/quests/:id/steps/:sid', requireJwtAuth, QuestController.getOneStep); // get one step
routes.delete('/quests/:id/steps/:sid', requireJwtAuth, QuestController.deleteOneStep); // delete one step
routes.post('/quests/:id/steps/:type', requireJwtAuth, QuestController.addStep);   // add new step

// Steps Hints
routes.post('/quests/:id/steps/:sid/hints/:type', requireJwtAuth, QuestController.addHint); // Add new hint to a step :type is either 'location' or 'text')
routes.post('/quest/:id/steps/:sid/hints/:type/:hid', requireJwtAuth, QuestController.updateHint); // Update hint information
routes.get('/quests/:id/steps/:sid/hints/:type/:hid', requireJwtAuth, QuestController.getOneHint); // Get one hint from the step
routes.get('/quests/:id/steps/:sid/hints/', requireJwtAuth, QuestController.getAllHint); // Get all hints that belong to a certain step

export default routes;
