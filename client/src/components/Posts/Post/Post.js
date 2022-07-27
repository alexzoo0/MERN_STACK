import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from'@material-ui/icons/MoreHoriz';
import useStyles from './style';

const Post = () => {
    const classes = useStyles();

    return(
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={Post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png' } title={Post.title} />
            <div className={classes.overlay}>
                <Typography variant='h6'>{Post.creator}</Typography>
            </div>
        </Card>
    )
}

export default Post;