import React from "react";
import Router from "next/router";
import { Paper } from "@material-ui/core/";
import Button from "../../components/StyledButton";
import { makeStyles } from "@material-ui/core/styles";
import DetailsCard from "../../components/detailsCard";
import UseRequest from "../../hooks/use-request";

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
  error: {
    background: "transparent",
  },
  btn: {
    margin: 0,
    background: "linear-gradient(45deg, #9e9107 30%, #d4c96d 90%)",
  },
}));

const TicketShow = ({ ticket }) => {
  const classes = useStyles();

  const { doRequest, errors } = UseRequest({
    url: "/api/orders/",
    method: "post",
    body: { ticketId: ticket.id },
    onSuccess: (order) =>
      Router.push("/orders/[orderId]", `/orders/${order.id}`),
  });
  const PurchaseButton = () => {
    return (
      <Button
        className={classes.btn}
        size="small"
        onClick={() => {
          doRequest();
        }}
      >
        Place an Order!
      </Button>
    );
  };
  return (
    <Paper className={classes.root} square>
      <DetailsCard ticket={ticket} button={PurchaseButton} />
      {errors}
    </Paper>
  );
};

TicketShow.getInitialProps = async (context, client) => {
  const { ticketId } = context.query;
  const { data } = await client.get(`/api/tickets/${ticketId}`);
  return { ticket: data };
};
export default TicketShow;
