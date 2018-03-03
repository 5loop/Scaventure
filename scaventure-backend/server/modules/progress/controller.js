import { Progress } from './model';
import { User } from '../users/model'
import config from '../../config/config';

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
    const { id } = req.params;    
    const email  = req.user.email; 
    User.findById({ _id: id }, (err, user) => {        
        if (!user) {
            return res.status(404).json({ error: true, message: 'There is no progress report.' });
        }
        else{
            const q = User.find({ email: email, isVerified: true }).select('_id');
            q.exec(async (err, progressIds) => {
                progressIds = progressIds.map( v => v._id );
                return res.status(200).json({ error: false, progress: await Progress.find({ '_userId' : { $in: progressIds } }) });
            });
        }
    });    
  }
