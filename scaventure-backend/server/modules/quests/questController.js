<<<<<<< HEAD:scaventure-backend/server/modules/quests/controller.js
import { Quest, Link } from './model';
=======
import { Quest } from './model';
>>>>>>> 246a24402727cceb9c0dc50c9d43c74e53347ccf:scaventure-backend/server/modules/quests/questController.js

import config from '../../config/config';
var sg = require('sendgrid')(config.sendgrid_key);
var SHA256 = require("crypto-js/sha256");
var CryptoJS = require("crypto-js");

/**
*  Get list of avaiable quests
*        @olga TODO:
*          - created by the user
*          - public quests
*          - quests the logged-in user was invited to
*/
export const getQuests = async (req, res) => {
  return res.status(200).json({ error: false, quests: await Quest.find()});
}

/**
 * Get information about one quest
 */
export const getOneQuest = async (req, res) => {
  const { id } = req.params; // quest id

  Quest.findById({ _id: id }, (err, quest) => {

    if (!quest) {
        return res.status(404).json({ error: true, message: 'Quest Does not exist!' });
    }

    return res.status(200).json({ error: false, quest });
  });
}

/**
 * Add New Quest
 */
export const addQuest = async (req, res) => {

  // id of the logged-in user
  const userId = req.user._id;
  try {

    // get body of the request
    const {title, description, type, loc} = req.body;

    let quest = new Quest({
      title, description, type, loc,
      createdBy: userId
    });

    return res.status(200).json({ error: false, quest: await quest.save()});
  } catch (e) {
    return res.status(500).json({ error: true, message: 'Error occured while adding new quest' });
  }
}

/**
 * Update Info on the Quest
 */
export const updateQuest = async (req, res) => {

  // id of the logged-in user
  const userId = req.user._id;
  const { id } = req.params; // quest id

  Quest.findById(id, async (err, quest) => {

    if (!quest) {
      return res.status(404).json({ error: true, message: 'Quest Does not exist!' });
    }

    // return error if author of the quest != logged-in user
    if (quest.createdBy != userId.toString()) {
      return res.status(401).json({ error: true, message: 'Not Authorized to perform the task!' });
    }

    // combine old & new quest params
    Object.assign(quest, req.body);

    return res.status(200).json({ error: false, quest: await quest.save()});
  });
}

/**
 * Delete a Quest
 */
export const deleteQuest = async (req, res) => {
  // id of the logged-in user
  const userId = req.user._id;
  const { id } = req.params; // quest id

  Quest.findById(id, async (err, quest) => {

    if (!quest) {
      return res.status(404).json({ error: true, message: 'Quest Does not exist!' });
    }

    // return error if author of the quest != logged-in user
    if (quest.createdBy != userId.toString()) {
      return res.status(401).json({ error: true, message: 'Not Authorized to perform the task!' });
    }

    return res.status(200).json({ error: false, quest: await quest.remove() });
  });
<<<<<<< HEAD:scaventure-backend/server/modules/quests/controller.js
}

// Feedback
// ...
/*

Invite User to a Private Quest, check if loggedin user is the author of the quest

Request Body:
{
    "email" : "scaventure@scv.com",
}
Send email to the invited user containing verification link (see Issue#2 and obi1 branch)
*/
// Invitation quest/3/..
export const inviteUser = async (req, res) => {
  // id of the logged-in user
  const userId = req.user._id;
  const { id } = req.params; // query string in url
  const { email } = req.body; // request body

  Quest.findById(id, async (err, quest) => {

    // check if quest with the id exists
    if (!quest) {
      return res.status(404).json({ error: true, message: 'No quest'});
    }

    // check if loggedin user is the author of the quest
    if (userId.toString() != quest.createdBy || quest.type != 'private') {
      return res.status(403).json({ error: true, message: 'No quest'});
    }

    // passed validation

    const hash = SHA256(email+id+new Date());
    console.log(hash.toString())

    // Create a new link in the Link table
    
    let link = new Link({
      userEmail: email,
      questId: id,
      hash: hash.toString()
    });

    await link.save();
    
    var request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: {
        personalizations: [
          {
            to: [
              {
                email: email.toString()
              }
            ],
            subject: `You were invited to a new exciting quest '${quest.title}'`
          }
        ],
        from: {
          email: 'scaventureapp@gmail.com'
        },
        content: [
          {
            type: 'text/plain',
            value: `Please follow the link http://localhost:4100/api/quests/${id}/verify/${hash}`
          }
        ]
      }
    });
     
    // With promise
    sg.API(request)
    .then(function (response) {
      console.log("Sent!!")
      console.log(response.statusCode);
      console.log(response.body);
      console.log(response.headers);
      return res.status(200).json({ error: false, message: "Invited the user!"});
    })
    .catch(function (error) {
      console.log("Sent!!")
      // error is an instance of SendGridError
      // The full response is attached to error.response
      console.log(error.response.statusCode);
      return res.status(500).json({ error: false, message: "Failed to send the email"});
    });
  });
}

// Quest Steps
// ...
=======
}
>>>>>>> 246a24402727cceb9c0dc50c9d43c74e53347ccf:scaventure-backend/server/modules/quests/questController.js
