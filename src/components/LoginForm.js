// Login form
import React, {useState, useEffect} from "react";
import * as Yup from "yup";
import axios from "axios";
// import {useHistory} from "react-router-dom";
import {TextField, Box, Button, Divider, Grid} from "@material-ui/core";

const formSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username should be at least 3 characters")
    .required("Username is a required field"),
  password: Yup.string().required("Password is a required field"),
});

const LoginForm = (props) => {
  // const history = useHistory();

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [serverError, setServerError] = useState("");

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    formSchema.isValid(loginData).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [loginData]);

  const validateChange = (event) => {
    Yup.reach(formSchema, event.target.name)
      .validate(event.target.value)
      .then((valid) => {
        setErrors({
          ...errors,
          [event.target.name]: "",
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [event.target.name]: err.errors[0],
        });
      });
  };

  const handleChange = (event) => {
    event.persist();
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
    validateChange(event);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("https://spotify-suggester1.herokuapp.com/api/auth/login", {
        username: loginData.username,
        password: loginData.password,
      })
      .then((response) => {
        console.log("response from login", response);

        setLoginData({
          username: "",
          password: "",
        });

        setServerError(null);

        props.history.push("/FavoritesPage");
      })
      .catch((err) => {
        setServerError("oops! something's not right!");
      });
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <h3>Login</h3>
      <Box mt={2}>
        <TextField
          id="username"
          name="username"
          label="Username"
          value={loginData.username}
          onChange={handleChange}
          fullWidth
        />
        {errors.username.length > 0 ? <p>{errors.username}</p> : null}
      </Box>
      <Box mt={2} color="text.primary">
        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={loginData.password}
          onChange={handleChange}
          fullWidth
        />
        {errors.password.length > 0 ? <p>{errors.password}</p> : null}
      </Box>
      <Box mt={6} mb={5}>
        <Button
          variant="contained"
          type="submit"
          size="large"
          fullWidth
          disabled={buttonDisabled}
        >
          Sign into Spotify
        </Button>
      </Box>
      <Box textAlign="center">
        <Grid container alignItems="center">
          <Grid item xs={5}>
            <Divider />
          </Grid>
          <Grid item xs={2}>
            OR
          </Grid>
          <Grid item xs={5}>
            <Divider />
          </Grid>
        </Grid>
      </Box>
      <Box mt={5}>
        <Button
          variant="contained"
          size="large"
          style={{backgroundColor: "#FF6584", color: "black"}}
          fullWidth
          onClick={props.formSwitch}
        >
          Create An Account
        </Button>
      </Box>
    </form>
  );
};

export default LoginForm;