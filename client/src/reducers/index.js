import { combineReducers } from 'redux';
import register from './register';
import posts from './posts';

export default combineReducers({ posts, register });