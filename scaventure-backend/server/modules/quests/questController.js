import { Quest, Link} from './model';


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
    const limit = req.query.limit || 3;
    const skip  = parseInt(req.query.skip) || 0;

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