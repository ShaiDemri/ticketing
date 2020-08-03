import React, { useState } from "react";
import Router from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Paper,
  Typography,
  CssBaseline,
  Avatar,
  Button,
  Link,
  Grid,
  IconButton,
  OutlinedInput,
  InputAdornment,
  TextField,
  InputLabel,
  FormControl,
} from "@material-ui/core";

import { Visibility, VisibilityOff, LockOutlined } from "@material-ui/icons/";

import useRequest from "../hooks/use-request";

const useStyles = makeStyles((theme) => ({
  paper: {
    flexGrow: 1,
    textAlign: "center",
    minHeight: "100vh",
    padding: theme.spacing(4),
    backgroundImage: " linear-gradient(to bottom, #fbc2eb 0%, #a6c1ee 100%)",
  },
  grid: {
    marginTop: theme.spacing(8),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  textField: {
    width: "inherit",
  },
  label: {
    textTransform: "capitalize",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const baseForm = ({ url, label }) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { doRequest, errors } = useRequest({
    url: url,
    method: "post",
    body: { email, password },
    onSuccess: () => Router.push("/"),
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    doRequest();
  };

  const handleClickShowPassword = () => {
    setShowPassword((sp) => !sp);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changeForm =
    label === "sign in" ? (
      <Link href="/auth/signup" variant="body2" component="a">
        {"Don't have an account? Sign Up"}
      </Link>
    ) : (
      <Link href="/auth/signin" variant="body2" component="a">
        {"Already have an account? Sign In"}
      </Link>
    );

  return (
    <Paper className={classes.paper} square>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Grid
          container
          className={classes.grid}
          direction="column"
          alignItems="center"
        >
          <Avatar className={classes.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography className={classes.label} component="h1" variant="h5">
            {label}
          </Typography>
          <form className={classes.form} onSubmit={onSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormControl className={classes.textField} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>

              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
                label="Password"
                name="Password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {label}
            </Button>
            {errors}
            <Grid container>
              <Grid item xs>
                <Link href="/auth/retrievePassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>{changeForm}</Grid>
            </Grid>
          </form>
        </Grid>
      </Container>
    </Paper>
  );
};
export default baseForm;
