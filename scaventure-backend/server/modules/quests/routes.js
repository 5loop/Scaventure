import { Router } from 'express';
import * as QuestController from './questController';
import * as StepController from './stepController';
//  import * as FeedbackController from './feedbackController';
//  import * as InvitationController from './invitationController';
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
routes.get('/quests/:id/steps', requireJwtAuth, StepController.getQuestSteps);    // get all quest steps
routes.delete('/quests/:id/steps', requireJwtAuth, StepController.deleteAllStep); // delete all steps that belong to a certain quest
routes.get('/quests/:id/steps/:sid', requireJwtAuth, StepController.getOneStep); // get one step
routes.delete('/quests/:id/steps/:sid', requireJwtAuth, StepController.deleteOneStep); // delete one step
routes.post('/quests/:id/steps/:type', requireJwtAuth, StepController.addStep);   // add new step

// Steps Hints
routes.post('/quests/:id/steps/:sid/hints/:type', requireJwtAuth, StepController.addHint); // Add new hint to a step :type is either 'location' or 'text')
routes.post('/quests/:id/steps/:sid/hints/:type/:hid', requireJwtAuth, StepController.updateHint); // Update hint information
routes.get('/quests/:id/steps/:sid/hints/:type/:hid', requireJwtAuth, StepController.getOneHint); // Get one hint from the step
routes.get('/quests/:id/steps/:sid/hints/', requireJwtAuth, StepController.getAllHints); // Get all hints that belong to a certain step

export default routes;
