import React from "react";
import Link from "next/link";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core/";
import Button from "../components/StyledButton";

const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
  root: {
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    color: theme.palette.common.white,
    background:
      "linear-gradient(0deg, rgba(68,0,148,1) 20%, rgba(30,188,224,1) 87%)",
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.focus,
    },
  },
}))(TableRow);

const TicketsTable = ({ tickets }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="tickets table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
            <StyledTableCell align="right">
              Purchase This Ticket!
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tickets.map((ticket) => (
            <StyledTableRow key={ticket.id}>
              <StyledTableCell component="th" scope="row">
                {ticket.title}
              </StyledTableCell>
              <StyledTableCell align="right">
                {ticket.price + "$"}
              </StyledTableCell>
              <StyledTableCell align="right">
                <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
                  <Button size="small"> View </Button>
                </Link>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default TicketsTable;
