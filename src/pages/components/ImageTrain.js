import React from "react";
import { useState } from "react";
import { saveAs } from "file-saver";
import { Button, makeStyles, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { useDropzone } from "react-dropzone";
import "../components/image.scss";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Slider from "@material-ui/core/Slider";
import { file } from "jszip";

// import { file } from 'jszip';
var zip = require("jszip")();

const PrettoSlider = withStyles({
  root: {
    color: "#808080",
    height: 1,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

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
  const [trainLen, settrainLen] = useState(70);
  const [validateLen, setvalidateLen] = useState(20);
  const [testLen, settestLen] = useState(10);
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

  const handleTrainChange = (event, newValue) => {
    event.preventDefault();
    settrainLen(newValue);
    // console.log(trainLen);
  };

  const handlevalidateChange = (event, newValue) => {
    event.preventDefault();
    setvalidateLen(newValue);
    // console.log(validateLen);
  };

  const handletestChange = (event, newValue) => {
    event.preventDefault();
    settestLen(newValue);
    //console.log(testLen);
  };

  //Export images
  const exportZip = () => {
    console.log(files);
    // const {arrayOfImages} = files;
    var train = zip.folder("train");
    var test = zip.folder("test");
    var validate = zip.folder("validate");

    var totalImages = files.length;
    var trainImagesLen = Math.floor(totalImages * (trainLen / 100));
    var validateImagesLen =
      Math.floor(totalImages * (validateLen / 100)) + trainImagesLen;
    var testImagesLen =
      Math.floor(totalImages * (testLen / 100)) + validateImagesLen;

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

        <div className="main-selector">
          <Typography gutterBottom className="gutterBtn">
            Train
          </Typography>
          <PrettoSlider
            valueLabelDisplay="auto"
            aria-label="pretto slider"
            value={trainLen}
            step={1}
            min={0}
            max={100}
            onChange={handleTrainChange}
          />
          <Typography gutterBottom className="gutterBtn">
            Valid
          </Typography>
          <PrettoSlider
            valueLabelDisplay="auto"
            aria-label="pretto slider"
            value={validateLen}
            step={1}
            min={0}
            max={100}
            onChange={handlevalidateChange}
          />
          <Typography gutterBottom className="gutterBtn">
            Test
          </Typography>
          <PrettoSlider
            valueLabelDisplay="auto"
            aria-label="pretto slider"
            value={testLen}
            step={1}
            min={0}
            max={100}
            onChange={handletestChange}
          />
        </div>
        <p className="main">All type of images supports</p>
      </div>
    </>
  );
}

export default ImageTrain;
