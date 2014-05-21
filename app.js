var restify = require('restify');
var mongojs = require("mongojs");

var appName = 'study-workout';

var ip = '127.0.0.1';
var port = '8080';
 
var server = restify.createServer({
  name : appName
});
 
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());

server.listen(port ,ip, function(){
  console.log('%s listening at %s ', server.name , server.url);
});

var connection_string = '127.0.0.1:27017/' + appName;
var db = mongojs(connection_string, [appName]);
var workouts = db.collection("workouts");
var exercises = db.collection("exercises");

var findAllWorkouts = function(req, res , next){
  res.setHeader('Access-Control-Allow-Origin','*');

  workouts.find(function(err , success){
    
    if(success){
      res.send(200 , success);
      return next();
    } else {
      return next(err);
    }

  });
};
 
var findWorkout = function(req, res , next){
  res.setHeader('Access-Control-Allow-Origin','*');
  
  workouts.findOne({_id:mongojs.ObjectId(req.params.workoutId)} , function(err , success){

    if(success){
      res.send(200 , success);
      return next();
    }

    return next(err);
  });
};
 
var postNewWorkout = function(req , res , next){
  var workout = {};
  workout.name = req.params.name;
  workout.category = req.params.category;
  workout.rating = req.params.rating;
  workout.estimatedTime = req.params.estimatedTime;
  workout.description = req.params.description;
  workout.count = 0;
  workout.bestTime = null;

  res.setHeader('Access-Control-Allow-Origin','*');

  workouts.save(workout , function(err , success){
    
    if(success){
      res.send(201 , workout);
      return next();
    } else {
      return next(err);
    }

  });
};

var updateWorkout = function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin','*');

  workouts.findAndModify({
      query: { _id: mongojs.ObjectId(req.params._id) },
      update: { 
                $set: { 
                        name: req.params.name,
                        category: req.params.category,
                        rating: req.params.rating,
                        estimatedTime: req.params.estimatedTime,
                        description: req.params.description,
                        count: req.params.count,
                        bestTime: req.params.bestTime
                      }
              },
      new: true
  }, function(err, workout) {
    res.send(200, workout);
    return next();
  });  
};

var deleteWorkout = function(req , res , next){
  res.setHeader('Access-Control-Allow-Origin','*');
  
  workouts.remove({_id:mongojs.ObjectId(req.params.workoutId)} , function(err , success){
    
    if(success){
      res.send(204);
      return next();    
    } else {
      return next(err);
    }
  });
};

var PATH = '/workouts'
server.get({path : PATH , version : '0.0.1'} , findAllWorkouts);
server.get({path : PATH +'/:workoutId' , version : '0.0.1'} , findWorkout);
server.put({path : PATH , version : '0.0.1'} , updateWorkout);
server.post({path : PATH , version: '0.0.1'} ,postNewWorkout);
server.del({path : PATH +'/:workoutId' , version: '0.0.1'} ,deleteWorkout);

var findAllExercises = function(req, res , next){
  res.setHeader('Access-Control-Allow-Origin','*');

  exercises.find(function(err , success){
    
    if(success){
      res.send(200 , success);
      return next();
    } else {
      return next(err);
    }

  });
};
 
var findExercise = function(req, res , next){
  res.setHeader('Access-Control-Allow-Origin','*');
  
  exercises.findOne({_id:mongojs.ObjectId(req.params.exerciseId)} , function(err , success){

    if(success){
      res.send(200 , success);
      return next();
    }

    return next(err);
  });
};

var findWorkoutExercises = function(req, res , next){
  res.setHeader('Access-Control-Allow-Origin','*');
  
  exercises.find({workoutId:req.params.workoutId} , function(err , success){

    if(success){
      res.send(200 , success);
      return next();
    }

    return next(err);
  });  
};
 
var postNewExercise = function(req , res , next){
  res.setHeader('Access-Control-Allow-Origin','*');

  var exercise = {};
  exercise.question = req.params.question;
  exercise.answer = req.params.answer;
  exercise.rating = req.params.rating;
  exercise.rating = req.params.rating;
  exercise.workoutId = req.params.workoutId;

  exercises.save(exercise , function(err , exercise){
    if(exercise){
      res.send(201 , exercise);
      return next();
    } else {
      return next(err);
    }
  });
};

var updateExercise = function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin','*');

  exercises.findAndModify({
      query: { _id: mongojs.ObjectId(req.params._id) },
      update: { 
                $set: { 
                        question: req.params.question,
                        answer: req.params.answer,
                        rating: req.params.rating
                      }
              },
      new: true
  }, function(err, exercise) {
    res.send(200, exercise);
    return next();
  });  
};

var deleteExercise = function(req , res , next){
  res.setHeader('Access-Control-Allow-Origin','*');
  
  // remove from workouts
  exercises.remove({_id:mongojs.ObjectId(req.params.exerciseId)} , function(err , success){
    
    if(success){
      res.send(204);
      return next();    
    } else {
      return next(err);
    }
  });
};

var PATH = '/exercises'
server.get({path : PATH , version : '0.0.1'} , findAllExercises);
server.get({path : PATH + '/:workoutId' , version : '0.0.1'} , findWorkoutExercises);
server.get({path : PATH + '/:exerciseId' , version : '0.0.1'} , findExercise);
server.put({path : PATH , version : '0.0.1'} , updateExercise);
server.post({path : PATH , version: '0.0.1'} ,postNewExercise);
server.del({path : PATH + '/:exerciseId' , version: '0.0.1'} , deleteExercise);
