import { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import Router from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, Typography, Slide } from "@material-ui/core";
import DetailsCard from "../../components/detailsCard";
import useRequest from "../../hooks/use-request";
import { msToHMS } from "../../api/time";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    textAlign: "center",
    justifyContent: "flex-start",
    alignItems: "center",
    minHeight: `93vh`,
    padding: theme.spacing(4),
    backgroundImage: " linear-gradient(to bottom, #fbc2eb 0%, #a6c1ee 100%)",
  },
  title: {
    fontFamily: "Lobster",
  },
  alert: {
    // width: "100%",
    marginBottom: theme.spacing(2),
    textTransform: "uppercase",
  },
}));
const OrderShow = ({ order, currentUser }) => {
  const classes = useStyles();

  const [msLeft, setMsLeft] = useState(0);
  const [timeLeft, setTimeLeft] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/payments",
    method: "post",
    body: {
      orderId: order.id,
    },
    onSuccess: () => {
      Router.replace("/orders");
    },
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const milisecondsLeft = new Date(order.expiresAt) - new Date();
      setMsLeft(Math.round(milisecondsLeft / 1000));
      const formattedTime = msToHMS(milisecondsLeft);
      setTimeLeft(formattedTime);
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [order]);

  if (msLeft < 0) {
    return (
      // <Paper className={classes.root}>
      //   <Typography gutterBottom>Order expired</Typography>
      // </Paper>
      <Paper className={classes.root}>
        <Alert className={classes.alert} severity="error">
          Order expired
        </Alert>
      </Paper>
    );
  }
  const StripeButton = () => {
    return (
      // <div />
      <Alert className={classes.alert} severity="info">
        Order expires in: {timeLeft}
      </Alert>
      // <StripeCheckout
      //   token={({ id }) => doRequest({ token: id })}
      //   stripeKey={process.env.STRIPE_PUBLIC_KEY}
      //   amount={order.ticket.price * 100}
      //   email={currentUser.email}
      // />
    );
  };
  return (
    <Paper className={classes.root}>
      <DetailsCard ticket={order.ticket} button={StripeButton} />
      <StripeCheckout
        token={({ id }) => doRequest({ token: id })}
        stripeKey={process.env.STRIPE_PUBLIC_KEY}
        amount={order.ticket.price * 100}
        email={currentUser.email}
      />
      {errors}
    </Paper>
  );
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default OrderShow;
