import { AppBar, IconButton, makeStyles, Toolbar } from "@material-ui/core";
import React from "react";
import SortIcon from "@material-ui/icons/Sort";

const useStyle = makeStyles((theme) => ({
  appbar: {
    background: "none",
  },
  appbarWrapper: {
    width: "80%",
    margin: "0 auto",
  },
  appbarTitle: {
    flexGrow: "1",
    color: "black",
  },
  icon: {
    color: "black",
    fontSize: "2rem",
  },
  colorText: {
    color: "#fff",
  },
  container: {
    textAlign: "center",
  },
  title: {
    color: "black",
    fontSize: "4.5rem",
  },
  goDown: {
    color: "#fff",
    fontSize: "4rem",
  },
}));

const Navbar = () => {
  const classes = useStyle();
  return (
    <div>
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar className={classes.appbarWrapper}>
          <h1 className={classes.appbarTitle} className="titleInfo">
            Visionify<span className={classes.colorText}>.ai</span>
          </h1>
          <IconButton>
            <SortIcon className={classes.icon} />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
