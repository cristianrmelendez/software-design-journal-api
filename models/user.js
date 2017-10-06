const mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs'); // Import Bcrypt Package

// user Schema
const userSchema = mongoose.Schema({
	userName:{
		type: String,
		required: true
	},
	password:{
		type: String,
		require: true
	}

});

userSchema.pre('save', function(next) {
    var user = this;
    // Function to encrypt password
    //this has to be more secure, add salt see https://www.npmjs.com/package/bcrypt-nodejs
    bcrypt.hash(user.password, null, null, function(err, hash) {
        if (err) return next(err); // Exit if error is found
        user.password = hash; // Assign the hash to the user's password so it is saved in database encrypted
        next(); // Exit Bcrypt function
    });
});


// Method to compare passwords in API (when user logs in)
userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password); // Returns true if password matches, false if doesn't
};

const Users = module.exports = mongoose.model('Users', userSchema);

// Get users
module.exports.getUsers = (callback, limit) => {
	Users.find(callback).limit(limit).sort({"userName": 1});
}

// Get User by id
module.exports.getUserById = (id, callback) => {
	Users.findById(id, callback);
}

// Get User by id
module.exports.getUserByUserName = (userName, callback) => {
	Users.find(userName, callback);
}

// Add User
module.exports.addUser = (user, callback) => {
	Users.create(user, callback);
}

// Update User
module.exports.updateUser = (id, user, options, callback) => {
	var query = {_id: id};
	var update = {
		userName: user.userName,
		password: user.password}
	Users.findOneAndUpdate(query, update, options, callback);
}


// Delete User by id
module.exports.removeUser = (id, callback) => {
	var query = {_id: id};
	Users.remove(query, callback);
}







