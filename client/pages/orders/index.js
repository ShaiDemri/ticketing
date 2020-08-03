import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, Typography, Slide } from "@material-ui/core";
import OrdersTable from "../../components/ordersTable";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: "center",
    minHeight: `93vh`,
    padding: theme.spacing(4),
    backgroundImage: " linear-gradient(to bottom, #fbc2eb 0%, #a6c1ee 100%)",
  },
  title: {
    fontFamily: "Lobster",
  },
}));

const OrderIndex = ({ currentUser, orders }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root} square>
      <Slide
        direction="up"
        in
        mountOnEnter
        unmountOnExit
        timeout={{ enter: 500, exit: 10 }}
      >
        {currentUser ? (
          <Grid>
            <Typography
              gutterBottom
              className={classes.title}
              variant={"h2"}
              color={"primary"}
            >
              Available Orders
            </Typography>
            {orders.length > 0 ? (
              <OrdersTable orders={orders} />
            ) : (
              <Grid>
                <Typography color="secondary" variant="h5">
                  No Orders Are Availible Right Now. You can create new tickets
                  <Link href="/tickets/new">
                    <a> here</a>
                  </Link>
                </Typography>
              </Grid>
            )}
          </Grid>
        ) : (
          <Grid
            container
            direction={"column"}
            justify={"center"}
            alignItems={"center"}
          >
            <Grid item>
              <Typography
                gutterBottom
                className={classes.title}
                color="primary"
                variant={"h3"}
              >
                Hello Friend!
              </Typography>
            </Grid>

            <Grid item>
              <Typography color="secondary" variant="h5">
                You are not signed in.{" "}
                <Link href={"/auth/signin"}>
                  <a>Sign in</a>
                </Link>{" "}
                now or{" "}
                <Link href={"/auth/signup"}>
                  <a>create new account</a>
                </Link>{" "}
                to start dealing Tickets!
              </Typography>
            </Grid>
          </Grid>
        )}
      </Slide>
    </Paper>
  );
};

// <ul>
//   {orders.map((order) => {
//     return (
//       <li key={order.id}>
//         {order.ticket.title} - {order.status}
//       </li>
//     );
//   })}
// </ul>
OrderIndex.getInitialProps = async (context, client) => {
  const { data } = await client.get("/api/orders");

  return { orders: data };
};

export default OrderIndex;
