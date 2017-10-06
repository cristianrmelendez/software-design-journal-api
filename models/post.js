const mongoose = require('mongoose');

//Post Schema
const postSchema = mongoose.Schema({
	userName:{
		type: String,
		required: true
	},
  body:{
    type: String,
    required: true
    },
  password:{
  type: String,
  required: true
  }
  });

const Posts = module.exports = mongoose.model('Posts', postSchema);

// Get Post
module.exports.getPosts = (callback, limit) => {
	Posts.find(callback).limit(limit);
}

// Get Post
module.exports.getPostById = (id, callback) => {
	Posts.findById(id, callback);
}

//Get Posts by user id
module.exports.getPostsByUserName = (userName, callback) => {
	Posts.find({"userName": userName}, callback);
}

// Add Post
module.exports.addPost = (post, callback) => {
	Posts.create(post, callback);
}

// Update post
module.exports.updatePost = (id, post, options, callback) => {
	var query = {_id: id};
	var update = {
		body: post.body
	}
	Posts.findOneAndUpdate(query, update, options, callback);
}

// Delete Review by id
module.exports.removePost = (id, callback) => {
	var query = {_id: id};
	Posts.remove(query, callback);
}






