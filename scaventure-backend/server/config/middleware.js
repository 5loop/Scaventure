import bodyParser from 'body-parser';
import morgan from 'morgan';
import passport from 'passport';

export default app => {
  app.use(function(req, res, next) {
    
    res.header('Access-Control-Allow-Origin', "*");
    // res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma');
  
    next();
  });
  
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(morgan('dev'));
  
};