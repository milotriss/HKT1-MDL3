import express from 'express';

import checkQuery from '../middlewares/checkQuery';
import PostService from '../services/post.service';
import checkId from '../middlewares/checkId';
const postService = new PostService()
const postController = express.Router();

postController.route('/:id/posts')
.get(checkId,postService.getUserPosts)
.post(checkId,postService.postNewUserPosts)



export default postController