import Link from "next/link";

const LandingPage = ({ currentUser, tickets }) => {
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
  );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get("/api/tickets");

  return { tickets: data };
};

export default LandingPage;
