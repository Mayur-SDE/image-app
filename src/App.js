import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import HomePage from "../src/pages/HomePage";
import ImageTrain from "./pages/components/ImageTrain";
import "../src/styles/style.css";

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
      <HomePage />
      <ImageTrain />
      <footer className={classes.footerInfo}>
        <h2 className={classes.footerTitle}>
          For More Info Visit:{" "}
          <a
            style={{ cursor: "pointer", textDecoration: "none" }}
            href="https://visionify.ai/"
          >
            Visionify.ai
          </a>
        </h2>
        {/* <LinkedInIcon className={classes.LinkedInIconInfo} />
        <GitHubIcon className={classes.GitHubIconInfo} /> */}
      </footer>
      <fileDownloader className={classes.fileDownloaderInfo} />
    </div>
  );
}
