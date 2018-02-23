import { Router } from 'express';
import * as QuestController from './feedbackcontroller';
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

// TO BE IMPLEMENTED @Arpit

// Feedback

routes.get('/quests/:id/feedbacks' , requireJwtAuth, QuestController.getFeedback ); // Get list of feedbacks for a quest
routes.post('/quests/:id/feedbacks' , requireJwtAuth, QuestController.addFeedback ); // Add a feedback to a quest
routes.delete('/quests/:id/feedbacks/:id' , requireJwtAuth, QuestController.deleteFeedback ); // delete a feedback (iff it was created by the logged-in user)
routes.post('/quests/:id/feedbacks/:id' , requireJwtAuth, QuestController.updateFeedback); // update a feedback (iff it was created by the logged-in user)

// Invitations

// routes.get('/quests/:id/users' , ... ); // Get list of users invited to the quest (iff quest is private & logged-in user is the author of the quest)
// routes.delete('/quests/:id/users/:id', ...); // 'Uninvite' a user (iff quest is private & logged-in user is the author of the quest)


// TO BE IMPLEMENTED @Arpit & @Gaurav

// Quest Steps

// routes.get('/quests/:id/steps', ... ) // get all quest steps
// ...
// ...

export default routes;
