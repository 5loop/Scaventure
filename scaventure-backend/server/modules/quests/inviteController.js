import { Link } from './model';
import { Quest } from './model';

import config from '../../config/config';
var sg = require('sendgrid')(config.sendgrid_key);
var SHA256 = require("crypto-js/sha256");
var CryptoJS = require("crypto-js");

//Verify that the user used the link
export const verifyUserLink = async(req, res) =>{

  const hash = req.params.hash;

  Link.findOne({hash}, async(err, link) =>{

  if(link){
    console.log(link.userEmail);
      if(link.hash == hash.toString()){
        link.verified = true;
        await link.save();
        return res.status(200).json({ error: true, message: 'Link verified!'});


      }else{
        return res.status(404).json({ error: true, message: 'Link not verified'});

      }
    }else{
      return res.status(404).json({ error: true, message: 'Link not found'});

    }
  });




}

//List of users invited to the quest
export const getInvitedUsers = async(req,res) =>{
  const questId = req.params.id;
  console.log(questId);
  Link.find({questId}, async(err, links) =>{
    if(links){
      return res.status(200).json({ error: false, links });
    }else{
      return res.status(404).json({ error: true, message: 'No users are invited to this quest'});
    }
  });
}

export const uninviteUser = async(req,res)=>{

  const userId = req.user._id;
  const { id } = req.params; // query string in url
  const { email } = req.params; // request body

  // check if loggedin user is the author of the quest
  Quest.findById(id, async (err, quest) => {
    console.log(quest);
    if(quest){
      if (userId.toString() == quest.createdBy && quest.type == 'private') {
        
        Link.findOne({userEmail: email, questId: id}, async (err, link) => { 
          /* check if link is empty */
          if(link){
            await link.remove();
            return res.status(200).json({ error: false, message: 'Successfully removed the link'});

          }
        });
        
      }else{
        return res.status(403).json({ error: true, message: 'Could not find the link'});
      }

    }else{
      return res.status(404).json({ error: true, message: 'Quest does not exist'});
    }
  });

}
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
      hash: hash.toString(),
      verify: true
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
            value: `Please follow the link http://${req.headers.host}/api/quests/${id}/users/verify/${hash}`
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