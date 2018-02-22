import { Quest, Step, QAStep, QRStep, GPSStep, Hint } from './model';

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
    let hint = [];

    hint = new Hint({...req.body, stepId: sid, type});

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

// delete all hints that belong to a certain step
export const deleteAllHints = async (req, res) => {
  const { id, sid } = req.params;

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

  try {
    const h = await Hint.find({stepId: sid}).remove();
    return res.status(200).json({ error: false, hint: h});
  } catch (e) {
    return res.status(500).json({ error: true, message: 'Error occured while deleting all hints'})
  }
}

// Delete one hint
export const deleteOneHint = async (req, res) => {
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

  try {
    const h = await Hint.findById(hid).remove();
    return res.status(200).json({ error: false, hint: h});
  } catch (e) {
    return res.status(500).json({ error: true, message: 'Error occured while deleting one hint'});
  }
}
