import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Router from "next/router";
import useRequest from "../../hooks/use-request";
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

const NewTicket = () => {
  const classes = useStyles();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/tickets",
    method: "post",
    body: { title: title.trim(), price },
    onSuccess: () => {
      Router.push("/");
    },
  });

  const onSubmit = (event) => {
    event.preventDefault();
    doRequest();
  };

  const onBlur = () => {
    const value = parseFloat(price);
    if (isNaN(value)) {
      return;
    }
    setPrice(value.toFixed(2));
  };

  return (
    // <div>
    //   <h1>Create a Ticket</h1>
    //   <form onSubmit={obSubmit}>
    //     <div className="form-group">
    //       <label htmlFor="">Title</label>
    //       <input
    //         className="form-control"
    //         type="text"
    //         value={title}
    //         onChange={(e) => setTitle(e.target.value)}
    //       />
    //     </div>
    //     <div className="form-group">
    //       <label htmlFor="">Price</label>
    //       <input
    //         className="form-control"
    //         type="text"
    //         onBlur={onBlur}
    //         value={price}
    //         onChange={(e) => setPrice(e.target.value)}
    //       />
    //     </div>
    //     {errors}
    //     <button className="btn btn-primary">Submit</button>
    //   </form>
    // </div>
    <Paper className={classes.paper} square>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Grid
          container
          className={classes.grid}
          direction="column"
          alignItems="center"
        >
          <form className={classes.form} onSubmit={onSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="Title"
              label="Title"
              name="Title"
              autoComplete="Title"
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <FormControl className={classes.textField} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-price">Price</InputLabel>
              <OutlinedInput
                id="outlined-adornment-price"
                type={"text"}
                onBlur={onBlur}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                fullWidth
                required
                label="Price"
                name="Price"
              />
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {"Create Ticket!"}
            </Button>
            {errors}
          </form>
        </Grid>
      </Container>
    </Paper>
  );
};
export default NewTicket;
