import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Post from './Post/Post';
import useStyles from './style';

const Posts = () => {
    const Posts = useSelector((state) => state.posts);
    const classes = useStyles();

    console.log(Posts);

    return(
        !Posts.length ? <CircularProgress /> : (
            <Grid className={classes.container} container alignitems="stretch" spacing={3}>
                {Posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={6}>
                        <Post post={post} />
                    </Grid>
                ))}
            </Grid>
        )
    );
}

export default Posts;