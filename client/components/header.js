import React from "react";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: theme.palette.background.default,
    textTransform: "none",
    "&:hover, &.Mui-hover": { backgroundColor: "transparent" },
  },
}));
const ButtonLink = ({ className, href, label, variant = "h6", ...props }) => {
  return (
    <Link href={href} passHref>
      <Button className={className} {...props}>
        <Typography variant={variant}>{label}</Typography>
      </Button>
    </Link>
  );
};
export default ({ currentUser }) => {
  const classes = useStyles();
  const links = [
    !currentUser && { label: "Sign In", href: "/auth/signin" },
    !currentUser && { label: "Sign Up", href: "/auth/signup" },
    currentUser && { label: "Sell Tickets", href: "/tickets/new" },
    currentUser && { label: "My Orders", href: "/orders" },
    currentUser && { label: "Sign Out", href: "/auth/signout" },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <Grid key={href} item xs={"auto"}>
          <ButtonLink
            className={classes.link}
            href={href}
            label={label}
            variant={"body2"}
          />
        </Grid>
      );
    });

  return (
    <div className={classes.root}>
      <AppBar position="relative">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <ButtonLink
            size={"large"}
            disableRipple
            disableFocusRipple
            className={classes.link}
            href={"/"}
            label={"GetTix"}
          />

          <Grid container spacing={3} justify="flex-end">
            {links}
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};
