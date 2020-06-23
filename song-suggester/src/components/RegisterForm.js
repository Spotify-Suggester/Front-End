import React, {useState, useEffect} from "react";
import * as Yup from "yup";
import axios from "axios";
import {useHistory} from "react-router-dom";
import {TextField, Box, Button, Divider, Grid} from "@material-ui/core";

const formSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username should be at least 3 characters")
    .required("Username is a required field"),
  password: Yup.string().required("Password is a required field"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

const RegisterForm = (props) => {
  const history = useHistory();

  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [serverError, setServerError] = useState("");

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    formSchema.isValid(registerData).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [registerData]);

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
    setRegisterData({
      ...registerData,
      [event.target.name]: event.target.value,
    });
    validateChange(event);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("https://spotify-suggester1.herokuapp.com/api/auth/register", {
        username: registerData.username,
        password: registerData.password,
      })
      .then((response) => {
        console.log(response.data);

        setRegisterData({
          username: "",
          password: "",
          confirmPassword: "",
        });

        setServerError(null);

        history.push("/Favorites");
      })
      .catch((err) => {
        setServerError("oops! something's not right!");
      });
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <h3>Create Account</h3>
      <Box mt={2}>
        <TextField
          id="username"
          name="username"
          label="Username"
          value={registerData.username}
          onChange={handleChange}
          fullWidth
        />

        {errors.username > 0 ? <p>{errors.username}</p> : null}
      </Box>
      <Box mt={2} color="text.primary">
        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={registerData.password}
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
          value={registerData.confirmPassword}
          onChange={handleChange}
          fullWidth
        />
        {errors.confirmPassword.length > 0 ? (
          <p>{errors.confirmPassword}</p>
        ) : null}
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
          Sign into Spotify
        </Button>
      </Box>
    </form>
  );
};

export default RegisterForm;
