
//Require the express package and use express.Router()
const express = require('express');
const router = express.Router();
const Posts = require('../models/post');
// Here are the Reviews

// get all the posts// Funciona
router.get('/posts', (req, res) => {
	Posts.getPosts((err, posts) => {
		if(err){
			console.log("No sirveee")
			throw err;
		}
		res.json(posts);
		
			
	});
});

// get a post by id/ Funciona
router.get('/posts/id=:_id', (req, res) => {
	Posts.getPostById(req.params._id, (err, review) => {
		if(err){
			throw err;
		}
		res.json(review);
	});
});

// get all the posts of a user by his Name // Funciona
router.get('/posts/userName=:userName', (req, res) => {
	Posts.getPostsByUserName(req.params.userName, (err, posts) => {
		if(err){
			throw err;
		}
		res.json(posts);
	});
});


// create a post // Funciona
router.post('/posts', (req, res) => {
	var post = req.body;
	console.log(post);


	Posts.addPost(post, (err, post) => {
		if(err){
			throw err;
		}
		res.json(post);
	});
});


// edit a post // falta por verificar
router.put('/posts/id=:_id', (req, res) => {
	var id = req.params._id;
	var post = req.body;
	Posts.updatePost(id, post, {}, (err, post) => {
		if(err){
			throw err;
		}
		res.json(post);
	});
});

// delete a post // Funciona
router.delete('/posts/id=:_id', (req, res) => {
	var id = req.params._id;
	Posts.removePost(id, (err, post) => {
		if(err){
			throw err;
		}
		res.json(post);
	});
});

module.exports = router;
