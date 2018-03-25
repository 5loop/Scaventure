import { Quest, Step, QAStep, QRStep, GPSStep, Hint } from './model';

/** Get steps that belong to a certain step */
export const getQuestSteps = async (req, res) => {

  const { id } = req.params; // quest id

  Step.find({ questId: id },[], { sort: { stepNumber: 1 } }, (err, steps) => {

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
      const numSteps = await Step.find({questId: id}).count();
      const s = await Step.findById(sid); // .remove()

      Step.find({ stepNumber : { $gt: s.stepNumber } }, async (err, steps) => {
        if (steps) {

          // Update order of the steps
          for (let step of steps) {
            step.stepNumber -= 1;
            step.save();
          }
        }

        s.remove();

        return res.status(200).json({ error: false, step: s });
      }); 
    } catch (e) {
      return res.status(500).json({ error: true, message: 'Error occured while adding deleting a step from a quest' });
    }
  });
}

export const editStep = async (req, res) => {
  const { id, stepid } = req.params; // quest id
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
      Step.findById(stepid, async (err, step) => {
        if (!step) {
          return res.status(404).json({ error: true, message: 'Step Does not exist!' });
        }

        if (req.body.stepNumber) 
          delete req.body.stepNumber;
    
        // combine old & new quest params
        Object.assign(step, req.body);
    
        return res.status(200).json({ error: false, step: await step.save()});
      });

    } catch (e) {
      return res.status(500).json({ error: true, message: 'Error occured while attempting to re-order steps!' });      
    }
  });
}

export const reorderSteps = async (req, res) => {
  const { id } = req.params; // quest id
  const userId = req.user._id;
  const { order } = req.body;

  Quest.findById(id, async (err, quest) => {
    if (!quest) {
      return res.status(404).json({ error: true, message: 'Quest does not exist' });
    }

    // check if user created the quest
    if (quest.createdBy != userId.toString()) {
      return res.status(401).json({ error: true, message: 'Not Authorized to perform the task!' });
    }

    try {
      Step.find({ questId: id },[], { sort: { stepNumber: 1 } }, async (err, steps) => {         
        if (!steps) {
          return res.status(404).json({ error: true, message: "Quest doesn't have any steps yet!"});
        }
        
        // update order
        for (let s of steps) {
          s.stepNumber = order[s._id];
          await s.save();
        }

        return res.status(200).json({ error: false, message: 'Reordering Completed' });
      });
    } catch (e) {
      return res.status(500).json({ error: true, message: 'Error occured while attempting to re-order steps!' });
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
      const numSteps = await Step.find({questId: id}).count();

      switch (type) {
        case 'qa':
          step = new QAStep({ ...req.body,  stepNumber: numSteps, questId: id });
          break;
        case 'qr':
          step = new QRStep({ ...req.body,  stepNumber: numSteps, questId: id });
          break;
        case 'gps':
          step = new GPSStep({ ...req.body, stepNumber: numSteps, questId: id });
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