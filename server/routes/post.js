import express from 'express';

import { getPosts, createPost, getPost} from '../controllers/post.js'


const router =  express.Router();

router.get('/', getPosts );
router.post('/', createPost );
router.get('/', getPost);




export default router;