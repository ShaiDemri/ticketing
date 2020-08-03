import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardActions, CardContent, Typography } from "@material-ui/core/";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 350,
    minWidth: 275,

    height: "fit-content",
    minHeight: 200,
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    background: "url(/ticket.png) no-repeat center center",
    backgroundClip: "border-box",
  },
  content: {
    display: "flex",
    alignContent: "center",
    justifyContent: "flex-start",
    flexDirection: "column",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  action: {
    justifyContent: "center",
  },
}));

const DetailsCard = ({ ticket, button: ActionButton }) => {
  const classes = useStyles();
  const { title, price, id } = ticket;
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent className={classes.content}>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        ></Typography>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Price: {price}$
        </Typography>
      </CardContent>

      <CardActions className={classes.action}>
        <ActionButton />
      </CardActions>
    </Card>
  );
};
export default DetailsCard;
