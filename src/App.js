import React from "react";
import { useState } from "react";
import { saveAs } from "file-saver";

import { makeStyles } from "@material-ui/core/styles";
import { Button, Container } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import FileUploadIcon from "@mui/icons-material/FileUpload";
// import { file } from 'jszip';
var zip = require("jszip")();

function App() {
  const [files, setFiles] = useState([]);
  const classes = useStyles();

  //input coverting multiple images to zip files
  const covertBaseImages = (Images) => {
    var arrayOfImages = [];
    Array.from(Images).forEach((image) => {
      console.log(image);
      var reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = function () {
        var arrayAuxillar = [];
        var base64 = reader.result;
        // console.log(base64)
        arrayAuxillar = base64.split(",");
        arrayOfImages.push({ base64: arrayAuxillar[1], number: image.name });
      };
    });

    // setFiles({...files, arrayOfImages});
    setFiles(arrayOfImages);
  };

  //Export images
  const exportZip = () => {
    console.log(files);
    // const {arrayOfImages} = files;
    var train = zip.folder("train");
    var test = zip.folder("test");
    var validate = zip.folder("validate");

    var totalImages = files.length;
    var trainImagesLen = Math.floor(totalImages * 0.7);
    var validateImagesLen = Math.floor(totalImages * 0.2) + trainImagesLen;
    var testImagesLen = Math.floor(totalImages * 0.1) + validateImagesLen;

    console.log(" train Images", trainImagesLen);
    console.log(" Validate Images", validateImagesLen);
    console.log("test Images", testImagesLen);

    var trainImages = files.slice(0, trainImagesLen);
    var validateImages = files.slice(trainImagesLen, validateImagesLen);
    var testImages = files.slice(validateImagesLen, totalImages);

    trainImages.map((image) => {
      train.file(image.number, image.base64, { base64: true });
    });
    validateImages.map((image) => {
      validate.file(image.number, image.base64, { base64: true });
    });
    testImages.map((image) => {
      test.file(image.number, image.base64, { base64: true });
    });
    zip.generateAsync({ type: "blob" }).then(function (content) {
      saveAs(content, "Example.zip");
    });
    zip = require("jszip")();
  };

  return (
    <div className={classes.divRoot}>
      <div>
        <title>
          <hi>Visionify</hi>
        </title>
      </div>
      <div>
        <input
          className={classes.inputDiv}
          type="file"
          id="file"
          multiple
          onChange={(e) => covertBaseImages(e.target.files)}
        ></input>
      </div>
      <div>
        <Button className={classes.buttonInfo} onClick={() => exportZip()}>
          Download
        </Button>
      </div>
    </div>
  );
}

export default App;

const useStyles = makeStyles((theme) => ({
  divRoot: {
    background: "#008080",
    height: "100vh",
    width: "120wh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "space-around",
  },
  inputDiv: {
    background: "grey",
    height: "20px",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  buttonInfo: {
    color: "#fff",
    background: "grey",
  },
}));
