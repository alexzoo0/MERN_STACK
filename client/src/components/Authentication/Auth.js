import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container,} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import Icon from './icon'
import { signin, RegisterNow } from '../../actions/login';
import { AUTH } from '../../constants/actionTypes';
import useStyles from './styles'
import Input from './Input';
import { gapi } from "gapi-script"




const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPwd: ''};

const SignUp = () => {
    const [ formData, setForm ] = useState(initialState);
    const [ isSignup, setIsSignup ] = useState(false);
    const dispatch = useDispatch();
    const history = useNavigate();
    const classes = useStyles();

    const [ showPassword, setShowPassword ] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);
    
    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: '858065889366-k1i3qvjc9rt6do4ssq1h1d2kojhcv36d.apps.googleusercontent.com',
                scope: 'email',
            });
        }
        gapi.load('client:auth2', start);
    }, []);

    const switchMode = () => {
        setForm(initialState);
        setIsSignup((prevIsSignup)  => !prevIsSignup);
        setShowPassword(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignup) {
            dispatch(RegisterNow(formData, history));
        }else{
            dispatch(signin(formData, history))
        }
    };

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({ type: AUTH, data: { result, token } });

         history('/');
         } catch (error) {
            console.log(error);
        }
    };

    const googleError = (error) => {
        console.log(error)
        console.log('Google Sign In was unsuccessful, Try again later.');
    };

    const handleChange = (e) => setForm({ ...formData, [e.target.name]: e.target.value});

    return(
        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component='h1' variant='h5'>{ isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        { isSignup && ( 
                            <>
                                <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                                <Input name='lastName' label='Last Name' handleChange={handleChange} half />

                            </>
                        )}
                        <Input name='email' label='Email Address'  handleChange={handleChange} type='email' />
                        <Input name='password' label='Password'  handleChange={handleChange} type={showPassword ? 'text' : 'password' } handleShowPassword={handleShowPassword} />
                        { isSignup && <Input name='confirmPwd' label='Repeat Password' handleChange={handleChange} type='password'/> }
                    </Grid>
                    <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                        { isSignup ? 'Sign Up' : 'Sign In' }
                    </Button>
                    
                    <GoogleLogin
                        clientId='858065889366-k1i3qvjc9rt6do4ssq1h1d2kojhcv36d.apps.googleusercontent.com'
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                              Google Sign In
                            </Button>
                          )}
                        buttonText="Login"
                        onSuccess={googleSuccess}
                        onFailure={googleError}
                        cookiePolicy={'single_host_origin'}
                    />
                    
                  <Grid container justifyContent='flex-end'>
                    <Grid item>
                        <Button onClick={ switchMode }>
                            { isSignup ? 'Already have an account? Sign in' : 'Dont have an account? Sign up' }
                        </Button>
                    </Grid>
                  </Grid>
                </form>
            </Paper>
        </Container>
    );

};

export default SignUp;

