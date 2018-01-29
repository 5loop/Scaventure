import { Quest, Step, QAStep, QRStep, GPSStep, Hint } from './model';


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
}

// Feedback
// ...

// Invitation
// ...

/** Get steps that belong to a certain step */
export const getQuestSteps = async (req, res) => {

  const { id } = req.params; // quest id

  Step.find({ questId: id }, (err, steps) => {

    if (!steps) {
      return res.status(404).json({ error: true, message: "Quest doesn't have any steps yet!"});
    }

    return res.status(200).json({ error: false, steps });
  });
}

/** View one step */
export const getOneStep = async (req, res) => {
  const { id, sid } = req.params; // quest id

  // check if quest exists
  const q = await Quest.find({_id: id}).count();
  if (!q) {
    return res.status(404).json({ error: true, message: 'Quest does not exist' });
  }

  // Get one step
  Step.findById(sid, (err, step) => {
    if(!step) {
      return res.status(404).json({ error: true, message: "Step doesn't exist"});
    }

    return res.status(200).json({ error: false, step });
  });
}


/** Delete one step */
export const deleteOneStep = async (req, res) => {
  const { id, sid } = req.params; // quest id
  const userId = req.user._id;

  Quest.findById(id, async (err, quest) => {
    if (!quest) {
      return res.status(404).json({ error: true, message: 'Quest does not exist' });
    }

    // check if user created the quest
    if (quest.createdBy != userId.toString()) {
      return res.status(401).json({ error: true, message: 'Not Authorized to perform the task!' });
    }

    try {
      const s = await Step.findById(sid).remove();
      return res.status(200).json({ error: false, step: s });
    } catch (e) {
      return res.status(500).json({ error: true, message: 'Error occured while adding deleting a step from a quest' });
    }
  });
}

/** Delete all steps from a quest */
export const deleteAllStep = async (req, res) => {
  const { id } = req.params; // quest id
  const userId = req.user._id;

  Quest.findById(id, async (err, quest) => {
    if (!quest) {
      return res.status(404).json({ error: true, message: 'Quest does not exist' });
    }

    // check if user created the quest
    if (quest.createdBy != userId.toString()) {
      return res.status(401).json({ error: true, message: 'Not Authorized to perform the task!' });
    }

    try {
      const s = await Step.find({questId: id}).remove();
      return res.status(200).json({ error: false, step: s });
    } catch (e) {
      return res.status(500).json({ error: true, message: 'Error occured while adding deleting a step from a quest' });
    }
  });
}

/** Add step to a certain quest */
export const addStep = async (req, res) => {
  const { id, type } = req.params; // quest id
  const userId = req.user._id;

  Quest.findById(id, async (err, quest) => {
    if (!quest) {
      return res.status(404).json({ error: true, message: 'Quest does not exist' });
    }

    // check if user created the quest
    if (quest.createdBy != userId.toString()) {
      return res.status(401).json({ error: true, message: 'Not Authorized to perform the task!' });
    }

    try {
      let step = [];

      switch (type) {
        case 'qa':
          step = new QAStep({ ...req.body, questId: id });
          break;
        case 'qr':
          step = new QRStep({ ...req.body, questId: id });
          break;
        case 'gps':
          step = new GPSStep({ ...req.body, questId: id });
          break;
        default:
          return res.status(404).json({ error: true, message: 'Step type is not recognized' });
      }

      await step.save();

      return res.status(200).json({ error: false, step, type });
    } catch (e) {
      return res.status(500).json({ error: true, message: 'Error occured while adding new step to a quest' });
    }
  });

}

// step hints

// Add new hint to a step :type
export const addHint = async (req, res) => {
  const { id, sid, type } = req.params; // quest and step id
  const userId = req.user._id;

  Quest.findById(id, async (err, quest) => {
    if (!quest) {
      return res.status(404).json({error:this, message: 'Quest does not exist!'})
    }
    if (quest.createdBy != userId.toString()) {
      return res.status(401).json({error: true, message: 'Not Authorized to perform the task!'});
    }
  });

  try {
    if (type == 'location') {
      // hint = new Hint({...req.body, stepId: sid});
      var hint = new Hint();
      hint.type = 'location';
      hint.location = { type: 'Point', coordinates: req.body.coordinates};
      hint.stepId = req.body.stepId;
    } else {
      // hint = new Hint({...req.body, stepId: sid});
      var hint = new Hint();
      hint.type = 'text';
      hint.stepId = req.body.stepId;
      hint.textHint = req.body.textHint;
    }

    await hint.save();

    return res.status(200).json({error: false, hint, type});
  } catch (e) {
    return res.status(500).json({error: true, message: 'Error occurred while adding new Hint to step'});
  }
}

// Update hint information
export const updateHint = async (req, res) => {
  
  const { id, sid, type, hid } = req.params; // quest id
  const userId = req.user._id;

  Quest.findById(id, async (err, quest) => {
    if (!quest) {
      return res.status(404).json({error:this, message: 'Quest does not exist!'})
    }
    if (quest.createdBy != userId.toString()) {
      return res.status(401).json({error: true, message: 'Not Authorized to perform the task!'});
    }
  });

  Hint.findById(hid, async (err, hint) => {
    if (!hint) {
      return res.status(404).json({ error: true, message: 'Hint does not exist'});
    }

    Object.assign(hint, req.body);
    return res.status(200).json({error: false, hint: await hint.save()});
  });
}

// Get all hints
export const getAllHints = async (req, res) => {
  
  const { id, sid } = req.params; // quest id

  // check steps
  const s = await Step.find({_id: sid}).count();
  if (!s) {
    return res.status(404).json({ error: true, message: 'Step does not exist' });
  }
  
  Hint.find({ stepId: sid }, (err, hint) => {
    if (!hint) {
      return res.status(404).json({ error: true, message: "Hints are not available"});
    }
    return res.status(200).json({ error: false, hint });
  });
}

// Get one hint
export const getOneHint = async (req, res) => {

  const { id, sid, type, hid } = req.params;

  // check if quest exists
  const q = await Quest.find({_id: id}).count();
  if (!q) {
    return res.status(404).json({ error: true, message: 'Quest does not exist' });
  }

  // check steps
  const s = await Step.find({_id: sid}).count();
  if (!s) {
    return res.status(404).json({ error: true, message: 'Step does not exist' });
  }

  // get hints
  Hint.findById(hid, (err, hint) => {
    if(!hint) {
      return res.status(404).json({ error: true, message: "Hint is not available"});
    }
    return res.status(200).json({ error: false, hint });
  });
}