import React, {useEffect, useState} from 'react';
import FileBase from 'react-file-base64';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './style';
import { createPost, updatePost } from '../../actions/posts';


const Form = ({ currentId, setCurrentId }) => {
    const classes = useStyles();
    const [postData, setPostData] = useState({ title:'', message: '', tags: '', selectedFile: '' });
    const post = useSelector((state) => (currentId ? state.posts.find((p) => p._id === currentId) : null));
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    


    useEffect(() => {
        if (post) setPostData(post);
    }, [post]);

    const clear = () => {
        setCurrentId(0); 
        setPostData({ title: '', message: '', tags: '', selectedFile: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (currentId === undefined) {
            dispatch(createPost({ ...postData, name: user?.result?.name }));
             clear();
        } else {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
             clear();
            }
            console.log(currentId);
        
    };

    if(!user?.result?.name){
        return(
            <Paper className={classes.paper}>
                <Typography variant='h6' align='center'>
                    Please Sign In to create / interact with posts.
                </Typography>
            </Paper>
        )
    }


    return(
        <Paper className={classes.paper}>
            <form autoComplete='off' noValidate className={classes.form} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? 'edit' : 'create'} a Post</Typography>
                <TextField className={classes.input} name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value})} />
                <TextField className={classes.input} name="message" variant="outlined" label="Message" fullWidth multiline minRows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                <TextField className={classes.input} name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                <div className={classes.fileInput}> <FileBase className={classes.file} type='file' multiple={false} onDone={({base64}) => setPostData({ ...postData, selectedFile: base64})} /> </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth >Submit</Button>
                <Button className={classes.clearSubmit} variant="contained" color="secondary" size="small" onClick={clear} fullWidth >Clear</Button>


            </form>

        </Paper>
    );

}

export default Form;

