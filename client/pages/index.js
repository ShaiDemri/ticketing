import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: "center",
    minHeight: "100vh",
    padding: theme.spacing(4),
    backgroundImage: " linear-gradient(to bottom, #fbc2eb 0%, #a6c1ee 100%)",
  },
}));
const LandingPage = ({ currentUser, tickets }) => {
  const classes = useStyles();

  const ticketList = tickets.map((ticket) => {
    return (
      <tr key={ticket.id}>
        <td>{ticket.title}</td>
        <td>{ticket.price + "$"}</td>
        <td>
          <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
            <a> View</a>
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <Paper className={classes.root} square>
      {currentUser ? (
        <div>
          <h1>Tickets</h1>
          {ticketList.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Link</th>
                </tr>
              </thead>
              <tbody>{ticketList}</tbody>
            </table>
          ) : (
            <div className="container">
              <h4>
                No Tickets Availible. You can create new tickets
                <Link href="/tickets/new">
                  <a> here</a>
                </Link>
              </h4>
            </div>
          )}
        </div>
      ) : (
        <Slide
          direction="up"
          in
          mountOnEnter
          unmountOnExit
          timeout={{ enter: 500, exit: 10 }}
        >
          <Grid
            container
            direction={"column"}
            justify={"center"}
            alignItems={"center"}
          >
            <Grid item>
              <Typography gutterBottom color="primary" variant={"h3"}>
                Hello Friend!
              </Typography>
            </Grid>

            <Grid item>
              <Typography color="secondary" variant={"subtitle2"}>
                You are not signed in.{" "}
                <Link href={"/auth/signin"}>Sign in</Link> now or{" "}
                <Link href={"/auth/signup"}>create new account</Link> to start
                dealing Tickets!
              </Typography>
            </Grid>
          </Grid>
        </Slide>
      )}
    </Paper>
  );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get("/api/tickets");

  return { tickets: data };
};

export default LandingPage;
