//Require the express package and use express.Router()
const express = require('express');
const router = express.Router();
const User = require('../models/user');


//Get all users by UserName (default) Funciona
router.get('/users', (req, res) => {
	User.getUsers((err, users) => {
		if(err){
			throw err;
		}
		res.status(200).json(users);
		
	});
});


//Get an user by his id - Funciona
router.get('/users/id=:_id', (req, res) => {
	User.getUserById(req.params._id, (err, user) => {
		if(err){
			throw err;
		}
		res.status(200).json(user);
	});
});

//Get an user by his username - Funciona
router.get('/users/username=:username', (req, res) => {
	User.getUserByUserName(req.params.username, (err, user) => {
		if(err){
			throw err;
		}
		res.status(200).json(user);
	});
});

//Get an user by his username - Funciona
router.get('/userNames', (req, res) => {
	User.getUserNames( (err, usersNames) => {
		if(err){
			throw err;
		}
		res.status(200).json(usersNames);
	});
});



// Add a new user - Funciona
router.post('/users', (req, res) => {
	var user = req.body;
	
	User.addUser(user, (err, user) => {
		if(err){
			res.status(503).json({success: false, message: "User already exist"});
		}
		else{
		res.status(200).json({success: true, message: "User Created", user: user});
		}
	});
});

// Edit a user by his id
router.put('/api/users/id=:_id', (req, res) => {
	var id = req.params._id;
	var user = req.body;
	User.updateUser(id, user, {}, (err, user) => {
		if(err){
			throw err;
		}
		else{
		res.status(200).json({success: true, message: "User edited", user: user});
		}
	});
});

// delete an user by its id, it also delete all his reviews
router.delete('/users/id=:_id', (req, res) => {

	var id = req.params._id;
	User.removeUser(id, (err, user) => {
		if(err){
			throw err;
		}

	});
});

module.exports = router;
