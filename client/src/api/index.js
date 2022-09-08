import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
})

export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatedPost = (id, post) => API.patch(`/posts/${id}`, post);
export const likePost =  (id) => API.patch(`/posts/${id}/likePost`);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signin = (form) => API.post('/user/signin', form);
export const RegisterNow = (formData) => API.post('/user/RegisterNow', formData);

