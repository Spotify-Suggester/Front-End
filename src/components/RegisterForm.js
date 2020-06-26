import React, {useState, useEffect, useContext} from "react";
import * as Yup from "yup";
import axios from "axios";
import {useHistory} from "react-router-dom";
import {TextField, Box, Button, Divider, Grid} from "@material-ui/core";
import {UserContext} from "../contexts/UserContext";

const RegisterForm = (props) => {
  const history = useHistory();

  const {loginData, setLoginData, setUserId} = useContext(UserContext);

  const [serverError, setServerError] = useState("");

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  let regex = new RegExp("^" + loginData.password + "$");

  const formSchema = Yup.object().shape({
    username: Yup.string()
      .min(4, "Username should be a minimum of 4 characters.")
      .required("Username is a required field"),
    password: Yup.string()
      .min(6, "Password should be a minimum of 6 characters.")
      .required("Password is a required field"),
    confirmPassword: Yup.string().matches(regex, "Password does not match."),
  });

  useEffect(() => {
    formSchema.isValid(loginData).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [loginData, formSchema]);

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
      .post("https://spotify-suggester1.herokuapp.com/api/auth/register", {
        username: loginData.username,
        password: loginData.password,
      })
      .then((response) => {
        console.log("new user created", response.data);
        history.push("/");
        alert("Account created - please log in now");
        setLoginData({
          username: "",
          password: "",
        });
        props.formSwitch();
      })
      .catch((err) => {
        setServerError("Username already exist. Please choose a new one.");
      });
  };

  return (
    <form autoComplete="on" onSubmit={handleSubmit}>
      <h3>Create Account</h3>
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
      <Box mt={2} color="text.primary">
        <TextField
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          autoComplete="current-password"
          value={loginData.confirmPassword}
          onChange={handleChange}
          fullWidth
        />
        {errors.confirmPassword.length > 0 ? (
          <p>{errors.confirmPassword}</p>
        ) : null}
        {serverError ? <p>{serverError}</p> : null}
      </Box>
      <Box mt={6} mb={5}>
        <Button
          variant="contained"
          type="submit"
          size="large"
          fullWidth
          disabled={buttonDisabled}
        >
          Create An Account
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
          Sign In
        </Button>
      </Box>
    </form>
  );
};

export default RegisterForm;
