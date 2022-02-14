import React from "react";
import { useState } from "react";
import { saveAs } from "file-saver";
import { Button, makeStyles } from "@material-ui/core";
import { useDropzone } from "react-dropzone";
import "../components/image.scss";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

// import { file } from 'jszip';
var zip = require("jszip")();

const useStyle = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
  buttonInfo: {
    backgroundColor: "teal",
  },
  buttonDiv: {
    paddingTop: "25%",
    justifyContent: "center",
    alignContent: "center",
    position: "center",
  },
}));

function ImageTrain() {
  const classes = useStyle();
  const [files, setFiles] = useState([]);

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
    <>
      <div className="file-card" id="place-to-visit">
        <div className="file-inputs">
          <input
            accept="image/*"
            multiple
            type="file"
            onChange={(e) => covertBaseImages(e.target.files)}
          ></input>
          <button>
            <i>
              <FontAwesomeIcon icon={faPlus} />
            </i>
            Click Here
          </button>
        </div>
        <div className="btn-wrapper">
          <Button onClick={() => exportZip()} className="btn-default">
            Download Images
          </Button>
        </div>

        <p className="main">All type of images supports</p>
      </div>
    </>
  );
}

export default ImageTrain;
