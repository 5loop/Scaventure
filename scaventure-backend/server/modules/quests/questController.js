import { Quest, Link, Step } from './model';
import config from '../../config/config';

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(config.sendgrid_key);

/**
*  Get list of avaiable quests
*          - ?type=user    - created by logged-in the user
*          - ?type=public  - public quests
*          - ?type=private - quests the logged-in user was invited to
*/
export const getQuests = async (req, res) => {
  const { type } = req.query;
  const userId = req.user._id;
  const email  = req.user.email;

  let options = {};
  if (type === 'public' || type === 'nearby') {
    options.type = 'public';
  }

  if (type == 'user') {
    options.createdBy = userId;
  }

  if (type == 'private') {
    const q = Link.find({ userEmail: email, verified: true }).select('questId');
    q.exec(async (err, questIds) => {
      questIds = questIds.map( v => v.questId );
      return res.status(200).json({ error: false, quests: await Quest.find({ '_id' : { $in: questIds } }) });
    });
  } else if (type === 'nearby') {

    const { longitude, latitude, distance } = req.query;
    const limit = req.query.limit || 10;
    const skip  = parseInt(req.query.skip) || 0;

    try {
      const quests = await Quest.find({
        loc: {
          $near: { $maxDistance: distance?distance:1000 * 1000, $geometry: {type: "Point", coordinates: [longitude, latitude]} },
        },
        type: options.type
      }).skip(skip).limit(limit);

      if (quests.length === 0) {
        return res.status(404).json({ error: true, message: 'There\'re no quests around specified location' });
      }

      return res.status(200).json({ error: false, quests });

    } catch (e) {
      return res.status(500).json({ error: true, message: 'Server error or there\'re no quests around specified location' });
    }

  } else {
    return res.status(200).json({ error: false, quests: await Quest.find(options) });
  }
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
  console.log(req.body);

  try {

    // get body of the request
    const {title, description, type, loc} = req.body;

    let quest = new Quest({
      title, description, type, loc,
      createdBy: userId
    });

    return res.status(200).json({ error: false, quest: await quest.save()});
  } catch (e) {
    console.log(e);
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
}

export const emailPackage = async (req, res) => {
    
  const userId = req.user._id;
  const { id } = req.params; // quest id
  
  Quest.findById({ _id: id }, (err, quest) => {
  
    if (!quest) {
      return res.status(404).json({ error: true, message: 'Quest Does not exist!' });
    }
    if (quest.createdBy != userId.toString()) {
      return res.status(401).json({ error: true, message: 'Not Authorized to perform the task!' });
    }

    Step.find({ questId: id },[], { sort: { stepNumber: 1 } }, (err, steps) => {
      
      let html = '<p>You\'ve requested a package containing all the information about your quest, here\'s what you got so far</p>';

      html += `<h2>Quest: '${quest.title}'</h2>`;
      html += `<p>Total Number of Steps: <b>${steps.length}</b></p>`
      html += `<p>${quest.description}</p>`;
      html += `<h2>Steps:</h2>`;
      for (let s of steps) {
        html += `<h3><b>Step #${s.stepNumber+1}</b></h3>`;
        html += `<p>Step Type: <i>${s.type}</i></p>`;
        html += `<p>${s.description}</p>`;
        if (s.type === 'QRStep') {
          const link = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${s.qrCode}`;
          html += `<img src="${link}" />`
        }
        html += `<hr/>`;
      }
      

      const msg = {
        to: req.user.email.toString(),
        from: "scaventureapp@gmail.com",
        subject: `Scaventure App: Quest Package '${quest.title}'`,
        templateId: 'f115cce8-e039-49d4-a65c-80b6a6531ba0',
        html,
      };
  
      sgMail.send(msg).then(function (response) {
        console.log("Sent!!");
        return res.status(200).send({ error: false, message: 'Success'})
      })
      .catch(function (error) {
        console.log(error)
        console.log("Not Sent!!")
      });
    });
      

  });
}
