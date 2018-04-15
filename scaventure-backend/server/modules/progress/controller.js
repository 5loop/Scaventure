import { Progress } from './model';
import { User } from '../users/model'
import config from '../../config/config';
import { Quest } from '../quests/model';

export const progress = async (req, res)  => {

    // id of the logged-in user
  const userId = req.user._id;
  try {
    const {_questId, timeTaken, pointsEarned} = req.body;    

    let progress = new Progress({
      timeTaken,
      pointsEarned,
      _questId: _questId, 
      _userId: userId
    });  

    return res.status(200).json({ error: false, progress: await progress.save()});
  } catch (e) {
    return res.status(500).json({ error: true, message: 'Error occured while saving progress' });
  }    
}


export const getAllProgress = async (req, res) => {    
  const id = req.user._id;   
  const email  = req.user.email; 
  Progress.find({ _userId: id },  async (err, progress) => {  
    let progQuest = [];
    for (let i = 0; i < progress.length; i++) {
      const q = await Quest.findById(progress[i]._questId);
      if (q) {
        progQuest.push({ title: q.title, ...progress[i]._doc });
      }  
    }
    return res.status(200).json({ error: false, progress: progQuest });
  });    
}
