import React, { useState } from 'react';
import { Container, Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Logo from '../svg/Logo';

import { LoginContext } from '../contexts/LoginContext';

const useStyles = makeStyles(() => ({
  gridPosition: {
    position: 'absolute',
    top: 0,
    left: 0
  },
  hero: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundImage:
      'linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)), url(https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '20rem'
  },
  brandTitle: {
    color: 'white',
    textAlign: 'center'
  },
  formContainer: {
    backgroundColor: '#0F0E26',
    height: '100vh',
    padding: '2rem'
  },
  form: {
    position: 'relative',
    width: '24rem',
    top: '50%',
    left: '50%',
    marginTop: '-14rem',
    marginLeft: '-12rem',
    color: 'white',

    '& label, & input, & .MuiButton-contained': {
      color: 'white'
    },

    '& .MuiButton-contained': {
      backgroundColor: '#6C63FF'
    },

    '& .MuiInput-underline:before': {
      borderBottomColor: 'rgba(255, 255, 255, 0.3) !important;'
    },

    '& .MuiFormLabel-root.Mui-focused': {
      color: '#6C63FF !important'
    },

    '& .MuiInput-underline:after': {
      borderBottomColor: '#6C63FF !important'
    },

    '& .MuiButton-contained.Mui-disabled': {
      color: 'rgba(0, 0, 0, .45)'
    },

    '& .MuiDivider-root': {
      backgroundColor: 'rgba(255,255,255,0.3)'
    },
    '& p': {
      backgroundColor: '#020215',
      color: '#FF6584',
      padding: '.5rem 1rem',
      fontSize: 14
    }
  },
  svg: {
    width: '100px'
  }
}));

const Login = () => {
  const classes = useStyles();

  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [serverError, setServerError] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(true);
  const [registerForm, setRegisterForm] = useState(false);

  const formSwitch = () => {
    setLoginData({
      username: '',
      password: '',
      confirmPassword: ''
    });

    if (loginForm) {
      setLoginForm(false);
      setRegisterForm(true);
    } else if (registerForm) {
      setLoginForm(true);
      setRegisterForm(false);
    }
  };

  return (
    <LoginContext.Provider
      value={{
        loginData,
        setLoginData,
        errors,
        setErrors,
        serverError,
        setServerError,
        buttonDisabled,
        setButtonDisabled,
        isLoading,
        setIsLoading,
        formSwitch
      }}
    >
      <Container maxWidth={false}>
        <Grid container className={classes.gridPosition}>
          <Grid item xs={12} md={6} className={classes.hero}>
            <Logo className={classes.svg} />
            <h1 className={classes.brandTitle}>Spotify Suggester</h1>
            <span>Best app to find new songs based on your selections.</span>
          </Grid>
          <Grid item xs={12} md={6} className={classes.formContainer}>
            <Box className={classes.form}>
              {loginForm && <LoginForm />}
              {registerForm && <RegisterForm />}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </LoginContext.Provider>
  );
};

export default Login;
