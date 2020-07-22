import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";

import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import ArrowBack from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles((theme) => ({
  underConstructionPage: {
    backgroundColor: "#F4E4CA",
  },
}));
export default () => {
  const classes = useStyles();
  return (
    <Paper className={classes.underConstructionPage}>
      <Link href="/" variant="body2">
        <IconButton color="primary">
          <ArrowBack />
        </IconButton>
      </Link>
      <Typography variant="h2" color="primary">
        Under Construction
      </Typography>
    </Paper>
  );
};
