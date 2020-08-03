import React from "react";
import Link from "next/link";
import { xor } from "lodash";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Toolbar,
  Checkbox,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  ListItemText,
} from "@material-ui/core/";
import FilterListIcon from "@material-ui/icons/FilterList";

import Button from "./StyledButton";

const useStyles = makeStyles((theme) => ({
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
}));

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

const OrderStatus = {
  created: "created",
  complete: "complete",
  cancelled: "cancelled",
};
const TableColumnFilter = ({ appliedFilters, onChooseFilter }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Tooltip title="Filter column">
        <IconButton aria-label="filter column" onClick={handleMenu}>
          <FilterListIcon color={"error"} />
        </IconButton>
      </Tooltip>
      <Menu
        id="menu-filter-table"
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            onChooseFilter(OrderStatus.created);
          }}
        >
          <Checkbox checked={appliedFilters.includes(OrderStatus.created)} />
          <ListItemText>Created</ListItemText>
        </MenuItem>

        <MenuItem
          onClick={() => {
            onChooseFilter(OrderStatus.cancelled);
          }}
        >
          <Checkbox checked={appliedFilters.includes(OrderStatus.cancelled)} />
          <ListItemText>Cancelled</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            onChooseFilter(OrderStatus.complete);
          }}
        >
          <Checkbox checked={appliedFilters.includes(OrderStatus.complete)} />
          <ListItemText>Completed</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

const TicketsTable = ({ orders }) => {
  const classes = useStyles();
  const [filters, setFilters] = React.useState([
    "created",
    "cancelled",
    "complete",
  ]);

  const onChooseFilter = (filter) => {
    setFilters(() => {
      return xor(filters, [filter]);
    });
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="tickets table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell align="center">
                Status
                <TableColumnFilter
                  appliedFilters={filters}
                  onChooseFilter={onChooseFilter}
                />
              </StyledTableCell>
              <StyledTableCell align="center">Price</StyledTableCell>
              <StyledTableCell align="right">
                Pay for this order!!!
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders
              .filter((order) => {
                return filters.includes(order.status);
              })
              .map((order) => (
                <StyledTableRow key={order.id}>
                  <StyledTableCell component="th" scope="row">
                    {order.ticket.title}
                  </StyledTableCell>
                  <StyledTableCell align="center" component="th" scope="row">
                    {order.status}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {order.ticket.price + "$"}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Link href="/orders/[orderId]" as={`/orders/${order.id}`}>
                      <Button
                        disabled={order.status !== "created"}
                        size="small"
                      >
                        Pay
                      </Button>
                    </Link>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default TicketsTable;
