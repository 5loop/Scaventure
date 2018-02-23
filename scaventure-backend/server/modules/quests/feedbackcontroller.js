import {Quest,Feedback} from './model';


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


export const addFeedback = async (req, res) => {

	const { id } = req.params; // quest id

  // id of the logged-in user
  const userId = req.user._id;
  try {

    // get body of the request
    const {title, description, datePosted, numStars} = req.body;

    let feedback = new Feedback({
      title, description, datePosted, numStars,
      reportedBy: userId,
	  questId: id
    });

    return res.status(200).json({ error: false, feedback: await feedback.save()});
  } catch (e) {
	  console.log(e);
    return res.status(500).json({ error: true, message: 'Error occured while adding new feedback' });
  }
}

export const getFeedback = async (req, res) => {
  const { id } = req.params; // quest id

  Feedback.find({ questId: id }, (err, feedbacks) => {

    if (!feedbacks) {
        return res.status(404).json({ error: true, message: 'Feedback Does not exist!' });
    }

    return res.status(200).json({ error: false, feedbacks });
  });
}

export const updateFeedback = async (req, res) => {

  // id of the logged-in user
  const userId = req.user._id;
  const { id } = req.params; // quest id

  Feedback.findById(id, async (err, feedback) => {

    if (!feedback) {
      return res.status(404).json({ error: true, message: 'Feedback Does not exist!' });
    }

    // return error if author of the quest != logged-in user
    if (feedback.reportedBy != userId.toString()) {
      return res.status(401).json({ error: true, message: 'Not Authorized to perform the task!' });
    }

    // combine old & new quest params
    Object.assign(quest, req.body);

    return res.status(200).json({ error: false, feedback: await feedback.save()});
  });
}

export const deleteFeedback = async (req, res) => {
  // id of the logged-in user
  const userId = req.user._id;
  const { id } = req.params; // quest id

  Feedback.findById(id, async (err, feedback) => {

    if (!feedback) {
      return res.status(404).json({ error: true, message: 'Feedback Does not exist!' });
    }

    // return error if author of the quest != logged-in user
    if (feedback.reportedBy != userId.toString()) {
      return res.status(401).json({ error: true, message: 'Not Authorized to perform the task!' });
    }

    return res.status(200).json({ error: false, feedback: await feedback.remove() });
  });
}


// Invitation
// ...

// Quest Steps
// ...
