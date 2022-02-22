import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, CssBaseline, IconButton } from "@material-ui/core";
import HomePage from "../src/pages/HomePage";
import ImageTrain from "./pages/components/ImageTrain";
import "../src/styles/style.css";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import { Link as Scroll } from "react-scroll";
import Navbar from "./pages/components/Navbar";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundColor: "grey",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  footerInfo: {
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    justifyContent: "space-between",
  },
  footerTitle: {
    color: "white",
    marginRight: "1rem",
    textUnderlineOffset: "none",
  },
  LinkedInIconInfo: {
    color: "blue",
    marginRight: "1rem",
    cursor: "pointer",
  },
  GitHubIconInfo: {
    cursor: "pointer",
  },
}));
export default function App() {
  const classes = useStyles();
  return (
    <div className="root">
      <CssBaseline />
      <Navbar />
      <HomePage />
      <ImageTrain />
      <br></br>
    </div>
  );
}
