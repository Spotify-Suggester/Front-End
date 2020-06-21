// Login form
import React, {useState} from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import {Container, Grid, Box} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  gridPosition: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  hero: {
    position: "relative",
    backgroundImage:
      "url(https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "20rem",
  },
  brandTitle: {
    position: "absolute",
    width: "100%",
    top: "42.5%",
    color: "white",
    textAlign: "center",
  },
  formContainer: {
    backgroundColor: "#0F0E26",
    height: "100vh",
    padding: "2rem",
  },
  form: {
    position: "relative",
    width: "24rem",
    top: "50%",
    left: "50%",
    marginTop: "-14rem",
    marginLeft: "-12rem",
    color: "white",

    "& label, & input, & .MuiButton-contained": {
      color: "white",
    },

    "& .MuiButton-contained": {
      backgroundColor: "#6C63FF",
    },

    "& .MuiInput-underline:before": {
      borderBottomColor: "rgba(255, 255, 255, 0.7) !important;",
    },

    "& .MuiFormLabel-root.Mui-focused": {
      color: "#6C63FF !important",
    },

    "& .MuiInput-underline:after": {
      borderBottomColor: "#6C63FF !important",
    },

    "& .MuiButton-contained.Mui-disabled": {
      color: "rgba(0, 0, 0, .45)",
    },

    "& .MuiDivider-root": {
      backgroundColor: "rgba(255,255,255,0.7)",
    },

    "& p": {
      backgroundColor: "#020215",
      color: "#FF6584",
      padding: ".5rem 1rem",
      fontSize: 14,
    },
  },
}));

const Login = () => {
  const classes = useStyles();

  const [loginForm, setLoginForm] = useState(true);
  const [registerForm, setRegisterForm] = useState(false);

  const formSwitch = () => {
    if (loginForm) {
      setLoginForm(false);
      setRegisterForm(true);
    } else if (registerForm) {
      setLoginForm(true);
      setRegisterForm(false);
    }
  };

  return (
    <Container maxWidth={false}>
      <Grid container className={classes.gridPosition}>
        <Grid item xs={12} md={6} className={classes.hero}>
          <h1 className={classes.brandTitle}>Spotify Suggester</h1>
        </Grid>
        <Grid item xs={12} md={6} className={classes.formContainer}>
          <Box className={classes.form}>
            {loginForm && <LoginForm formSwitch={formSwitch} />}
            {registerForm && <RegisterForm formSwitch={formSwitch} />}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
