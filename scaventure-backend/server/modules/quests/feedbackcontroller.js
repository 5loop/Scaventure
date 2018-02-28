import { Feedback } from './model';

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
