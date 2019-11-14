var mongoose=require('mongoose');
// var usersSchema=mongoose.Schema({
// 	// name:{
// 	// 	type:String,
// 	// 	required:true

// 	// },
// 	username: {
// 		type: String,
// 		lowercase: true, 
// 		unique: true, 
// 		required: [true, "can't be blank"], 
// 		match: [/^[a-zA-Z0-9]+$/, 'is invalid'], 
// 		index: true
// 	},
// 	email: {
// 		type: String, 
// 		lowercase: true, 
// 		unique: true, 
// 		required: [true, "can't be blank"], 
// 		match: [/\S+@\S+\.\S+/, 'is invalid'], 
// 		index: true
// 	},
// 	},
// 	// password:{
// 	// 	type:String,
// 	// 	required:true
// 	// },
	
// });
// UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

var usersSchema =mongoose.Schema({

  username: { 
  	type: String,  
  	required: [true, 'Full name must be provided'] 
  },

  email:    { 
    
    type: String,     

    Required:  'Email address cannot be left blank.',
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    index: {unique: true, dropDups: true}
    },

  password: { 
 	type: String,
    trim: true,
    required: "Password is Required",
    validate: [
      function(input) {
        return input.length >= 6;
      },
      "Password should be longer than 6 character."
    ]
}

});
var User=module.exports=mongoose.model('User',usersSchema);