const express=require('express');
const path=require('path');
const mongoose=require('mongoose');
const mongo=require('mongodb');
const bodyParser=require('body-parser');
const expressValidator=require('express-Validator');
const flash=require('connect-flash');
const session= require('express-session');
const passport=require('passport');
const config= require('./config/database');


mongoose.connect(config.database);
var db=mongoose.connection;
db.dropDatabase();
var url='mongodb://localhost:27017/db_user';

//Check Connection
db.once('open',function(){
	console.log('Connected To MongoDB');
});

// Check for Database Error
db.on('error',function(err){
	console.log(err);
});

//Init App
const app=express();

// //Include Products Model
// var Products=require('./models/products')

//Include Users Model
var User=require('./models/user')

// //Include Cart Model
// var Cart=require('./models/cart')

//Load View Engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

//Body Parser Middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Set Public Folder
app.use(express.static(path.join(__dirname,'public')));

//Home Route
app.get('/',function(req,res){
		res.render('index')
});
app.get('/index',function(req,res){
		res.render('index')
});
app.get('/scholarship',function(req,res){
		res.render('scholarship')
});
app.get('/contact',function(req,res){
		res.render('contact')
});
app.get('/gallery',function(req,res){
		res.render('gallery')
});
app.get('/about_us',function(req,res){
		res.render('about_us')
});
app.get('/register',function(req,res){
		res.render('register')
});


//Add  user Code
app.post('/adduser',function(req,res){
	var user=new User();
	user.username=req.body.name;
	user.email=req.body.email;
	user.password=req.body.password;
	user.save(function(err){
		if(err){
			console.log(err);
			return;
		}
		else{
			console.log(user)
			res.redirect('/')
		}
	});
      
});
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);
//passport config

require('./config/passport')(passport);
//passport middleware
  app.use(passport.initialize());
  app.use(passport.session());

//mongodb
// app.post('/assuser',function(req,res){
// 	var item= {
// 		username:req.body.name,
// 		email:req.body.email,
// 		password:req.body.password
// 	};
// 	mongo.connect(url,function(err, db){
// 		assert.equal(null, err);
// 		db.collection('db_user').insertOne(item, function(err, result){
// 			 assert.equal(null, err);
//       console.log('Item inserted');
//       db.close();
// 		});
// 	});
// 	res.redirect('/');
// });


// app.get('/seeadmin',function(req,res){
// 	var result=[];
// 	mongo.connect(url,function(err,db){
// 		assert.equal(null,err);
// 		var cursor=db.collection('users').find();
// 		cursor.forEach(function(doc,err){
// 			assert.equal(null,err);
// 			result.push(doc);
// 		},function(){
// 			db.close();
// 			res.render('index',{item:result});
// 		});
// 	});

// });

app.get('/admin',function(req,res){
	User.find({},function(err,users){
	if(err){
		console.log(err);
	}
	else{	console.log('data gaya ')
			//To Get all data From Products collection
			res.render('admin',{
				title:users,
				users:users
			});//Rendering The Index Page and sending data	
	    }	
	
	});
	
});
app.get('/admin',function(req,res){
		res.render('admin')
});
app.use(flash());

//login process
app.post('/login',function(req, res, next){
	passport.authenticate('local',{
		successRedirect:'/',
		failureRedirect:'login',
		failureFlash:true
	})(req,res,next);
})
// router.get('/logout', (req, res) => {
//   req.logout();
//   req.flash('success_msg', 'You are logged out');
//   res.redirect('/users/login');
// });

app.get('/login',function(req,res){
		res.render('login')
});
//Start Server
app.listen(3000,function(){
	console.log("Running At 3000");

})