
//Require the express package and use express.Router()
const express = require('express');
const router = express.Router();
const Posts = require('../models/post');
const User = require('../models/user');


// get all the posts// Funciona
router.get('/posts', (req, res) => {
	Posts.getPosts((err, posts) => {
		if(err){
			console.log("No sirveee")
			throw err;
		}
	
		res.status(200).json(posts);
		
			
	});
});

// get a post by id/ Funciona
router.get('/posts/id=:_id', (req, res) => {
	Posts.getPostById(req.params._id, (err, post) => {
		if(err){
			throw err;
		}
		res.status(200).json(post);
	});
});

// get all the posts of a user by his Name // Funciona
router.get('/posts/userName=:userName', (req, res) => {
	Posts.getPostsByUserName(req.params.userName, (err, posts) => {
		if(err){
			throw err;
		}
		res.status(200).json(posts);
	});
});


router.post('/posts', function (req, res, next) {
    // console.log("Got to the auth post route with " + JSON.stringify(req.body));
	var userNameProvided = req.body.userName;
	var passwordProvided = req.body.password;
	
	User.findOne({userName: userNameProvided}).exec(function (err, data) {
        if (err) {
            //if error
            console.log("error");
            res.status(403).json({success: false, message: "Not Found"});
        } else if (!data) {
            //if no data is brought back
            console.log("not found");
            res.status(403).json({success: false, message: "Not Found"});
        } else if (data) {
            //compare password
            var validPassword = data.comparePassword(passwordProvided);
            //if password match
            if (validPassword) {
				var mydate = new Date().toDateString();
				
				var postToAdd = {	"userName" : userNameProvided,
									"body" : req.body.body,
									"date": mydate
								};
				
				console.log("The post is: ")
				console.log(postToAdd);

				Posts.addPost(postToAdd, (err, post) => {
						if(err){
							throw err;
						}
						res.status(200).json({success: true, message: "Post succesfull"});
					});
 
            } else if (!validPassword) {
                //if password don't match
                console.log("password dont match");
                res.status(403).json({success: false, message: "User NOT authenticated"});
            }
        }
    })
});


// edit a post // falta por verificar
router.put('/posts/id=:_id', (req, res) => {
	var id = req.params._id;
	var post = req.body;
	Posts.updatePost(id, post, {}, (err, post) => {
		if(err){
			throw err;
		}
		res.status(200).json(post);
	});
});

// delete a post // Funciona
router.delete('/posts/id=:_id', (req, res) => {
	var id = req.params._id;
	Posts.removePost(id, (err, post) => {
		if(err){
			throw err;
		}
		res.status(200).json(post);
	});
});

module.exports = router;
