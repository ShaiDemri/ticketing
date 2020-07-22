import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Router from "next/router";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import useRequest from "../hooks/use-request";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        GetTix
      </Link>
      {" " + new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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

export default ({ url, label }) => {
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
      <Link href="/auth/signup" variant="body2">
        {"Don't have an account? Sign Up"}
      </Link>
    ) : (
      <Link href="/auth/signin" variant="body2">
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
            <LockOutlinedIcon />
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
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </Paper>
  );
};
