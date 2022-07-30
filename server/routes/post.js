import express from 'express';

import { getPosts, createPost, getPost, updatePost} from '../controllers/post.js'


const router =  express.Router();

router.get('/', getPosts );
router.post('/', createPost );
router.get('/:id', getPost);
router.patch('/:id', updatePost);




export default router;