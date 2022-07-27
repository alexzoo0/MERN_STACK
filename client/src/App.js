
import React, { useEffect, useState } from 'react';
import {Container, AppBar, Typography, Grow, Grid} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getPosts } from './actions/posts';

import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import memories from './images/memories.png';
import useStyles from './styles';


const App = () => {
    const [currentId,] = useState(0);
    const dispatch = useDispatch();
    const classes = useStyles();
    
    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);    
    

    return (
        <Container maxidth="lg" className={classes.background} >
            <AppBar className={classes.AppBar} color="inherit">
                <Typography className={classes.heading} variant="h3" align='center'>Memories</Typography>
                

                </AppBar>
            <Grow in className={classes.main}>
                <Container>
                    <Grid container justifyContent="space-between" alignitems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form />
                        </Grid>
                        </Grid>
                    </Container>
                </Grow>
        </Container>
        
        
    );
}

export default App;