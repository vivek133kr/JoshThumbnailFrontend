import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import "@fontsource/open-sans"
import LinearProgress from "@mui/material/LinearProgress";
import { useNavigate, Navigate, useParams } from "react-router-dom";

import UPSClogo from "./elements/jt-logo-color.png"
function ThumbNailMain() {
  useEffect(() => {
    document.title = "Thumbnail Review";
     document.body.style.backgroundColor = "#f3f6f8";
  }, []); //
  const [file, setFile] = useState(null);

  const navigate = useNavigate()
  let [fileError, setFileError] = useState(false);

  let [textError, setTextError] = useState(false);

  let [error, setError] = useState(false);

  const [loading, setLoading] = useState(false);

  const email = localStorage.getItem("thumbnail-review-user-email");
  const name = localStorage.getItem("thumbnail-review-first-name");
  let [imageUrl, setImageUrl] = useState("");
  const [text, setText] = useState("");
  const [output, setOutput] = useState({ result: "", reason: "", warning: "" });

  const [messageReceived, setMessageReceived] = useState([]);

  function processInput(input) {
    const resultRegex = /result:/i;
    const reasonRegex = /reason:/i;
    const warningRegex =
      /warning(?:s)?\/?recommendation(?:s)?|warning(?:s)? or recommendation(?:s)?/i;

    // Function to find the index and matched string of the regex match
    const findRegexMatch = (regex, str) => {
      const match = str.match(regex);
      return match ? { index: match.index, match: match[0] } : null;
    };

    let result = "",
      reason = "",
      warning = "";

    // Finding indices and matches of each section
    const resultMatch = findRegexMatch(resultRegex, input);
    const reasonMatch = findRegexMatch(reasonRegex, input);
    const warningMatch = findRegexMatch(warningRegex, input);

    // Extracting each section based on the found indices and matches
    if (resultMatch) {
      result = input
        .slice(
          resultMatch.index + resultMatch.match.length,
          reasonMatch ? reasonMatch.index : undefined
        )
        .trim();
    }

    if (reasonMatch) {
      reason = input
        .slice(
          reasonMatch.index + reasonMatch.match.length,
          warningMatch ? warningMatch.index : undefined
        )
        .trim();
    }

    if (warningMatch) {
      warning = input
        .slice(warningMatch.index + warningMatch.match.length)
        .trim();
         if (warning.startsWith(":")) {
           warning = warning.substring(1).trim();
         }
    }

    return { result, reason, warning };
  }

  const handleFileChange = (event) => {
    setFileError(false)
    setFile(event.target.files[0]);
  };

  const handleTextChange = (event) => {
    setTextError(false)
    setText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file && !text){
        setFileError(true);
        setTextError(true);
        return;
    }else if (!file){

        setFileError(true);
        return;
    }else if (!text){
 setTextError(true);
 return;
    }
    setLoading(true);

    let imageUrl = await handleSave();

    console.log("Line 80:", imageUrl);

    const formData = new FormData();
    formData.append("file", file);

    // Add any other data you want to send along with the file
    formData.append("transcription", text);

    formData.append("userName", name);
    formData.append("userEmail", email);
    formData.append("imageUrl", imageUrl.data);

    try {
      const response = await axios.post(
        "http://localhost:3005/review-thumbnail",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      let processed = null;
      if (response.data.data.length == 1) {
        if (response.data.data[0].content[0].text) {
        }
        processed = processInput(response.data.data[0].content[0].text.value);
      } else if (response.data.data.length == 2) {
        if (response.data.data[0].content[1].text) {
          processed = processInput(response.data.data[0].content[1].text.value);
        }
      } else {
        for (let i = 0; i < response.data.data.length - 3; i++) {
          let current = response.data.data[i].content;

          let track = false;
          for (let k = 0; k < current.length; k++) {
            if (current[k].type === "text") {
              processed = processInput(current[k].text.value);

              track = true;
              break;
            }
          }
          if (track === true) {
            break;
          }
        }
      }

      setOutput(processed);

      setLoading(false);
      //   document.getElementById("fileInput").value = "";
      //   setText("");
    } catch (error) {
      setOutput({ result: "", reason: "", warning: "" });
        document.getElementById("fileInput").value = "";
        setText("");

      setImageUrl("");
      setLoading(false);

      setError(true);

      setTimeout(() => {
        setError(false);
      }, 5000);
    }
  };

  async function handleSave() {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:3005/save-database",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setImageUrl(response.data)
      return response;
    } catch (error) {
       setOutput({ result: "", reason: "", warning: "" });
    document.getElementById("fileInput").value = "";
    setText("");

          setLoading(false);
          setError(true);
          setTimeout(() => {
            setError(false);
          }, 5000);
        
    }
  }


  console.log(imageUrl
    , " line 188")
  return (
    <div
      style={{
        width: "100vw",

        fontFamily: "Open Sans",
        marginBottom: "100px",
      }}
      className="App"
    >
      <div
        style={{
          backgroundColor: "white",
          border: "1px solid black",
          height: "80px",
          position: "relative",
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <img
          style={{
            width: "fit-content",
            height: "80%",
            marginLeft: "30px",
          }}
          src={UPSClogo}
          alt="josh-logo"
        />

        <p
          style={{
            cursor: "pointer",
            marginLeft: "30px",
            padding: "10px",
            border: "1px solid black",
          }}
          onClick={() => {
            navigate("/thumbnails");
          }}
        >
          <b>Thumbnails</b>
        </p>
        <p
          style={{
            cursor: "pointer",
            marginLeft: "30px",
            padding: "10px",
            border: "1px solid black",
          }}
          onClick={() => {
            navigate("/thumbnail-review");
          }}
        >
          <b>Review Thumbnail</b>
        </p>
        <button
          style={{
            position: "absolute",
            right: "10px", // Adjust the distance from the right edge as needed
            padding: "10px",
            backgroundColor: "white",

            border: "1px solid black",
            cursor: "pointer",
          }}
          onClick={() => {
            localStorage.removeItem("thumbnail_review_login");
            navigate("/thumbnail-review/login");
          }}
        >
          Logout
        </button>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          marginTop: "30px",
          flexDirection: "column",

          alignItems: "center",
        }}
      >
        <h1
          style={{
            fontSize: "30px",
            fontWeight: "bold",
            marginBottom: "30px",

            paddingBottom: "10px",
          }}
        >
          Thumbnail Review
        </h1>

        <ul
          style={{
            listStyle: "inside",
            listStyleType: "disc",
            width: "50%",
            textAlign: "left",
          }}
        >
          <li>Try Again! If you are not satisfied with the Result</li>
        </ul>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
            marginTop: "20px",
            alignContent: "center",
            gap: "10px",
          }}
          onSubmit={handleSubmit}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <label
              style={{
                fontSize: "20px",
                textAlign: "left",
              }}
            >
              Thumbnail Image :
            </label>
            <input
              id="fileInput"
              disabled={loading ? true : false}
              style={{
                border:
                  fileError === true ? "2px solid red" : "1px solid black",

                width: "100%",
              }}
              type="file"
              onChange={handleFileChange}
            />
          </div>
          <div
            style={{
              width: "100%",
              marginTop: "15px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <label
              style={{
                fontSize: "20px",
                textAlign: "left",
              }}
            >
              Thumbnail Title :
            </label>
            <input
              disabled={loading ? true : false}
              style={{
                border:
                  textError === true ? "2px solid red" : "1px solid black",
                padding: "10px",
                height: "30px",
                width: "100%",
              }}
              type="text"
              value={text}
              onChange={handleTextChange}
            />
          </div>
          {loading === false && (
            <button
              style={{
                backgroundColor: "#1876d1",
                width: "200px",
                height: "50px",
                fontFamily: "Open Sans",
                color: "white",
                fontWeight: "bold",
              }}
              type="submit"
            >
              Upload
            </button>
          )}
        </form>
      </div>

      <br />

      {error && (
        <div
          style={{
            width: "100%",
            display: "flex",

            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p
            style={{
              width: "50%",
              color: "red",
            }}
          >
            Some Error Occured... Please try Again or Report the problem if
            problems continues after trying 2-3 times
          </p>
        </div>
      )}
      {output &&
      output.reason &&
      output.result &&
      output.warning &&
      loading === false ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",

            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "50%",
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
              gap: "30px",
              marginTop: "10px",
            }}
          >
            <p>
              <strong>RESULT:</strong>{" "}
              <span
                style={{
                  backgroundColor: "white",
                  padding: "10px 20px",
                  fontWeight: "bold",
                  marginLeft: "10px",
                  color:
                    output.result.toLowerCase() === "'approved'" ||
                    output.result.toLowerCase() === "approved"
                      ? "green"
                      : "red",
                }}
              >
                {" "}
                {output.result}
              </span>
            </p>

            {imageUrl && (
              <img
                src={imageUrl}
                alt="thumbnail"
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            )}

            <>
              <p>
                <strong>REASON:</strong>{" "}
                <span
                  style={{
                    marginLeft: "10px",
                    fontSize: "18px",
                  }}
                >
                  {output.reason}{" "}
                </span>
              </p>

              {output.result.toLowerCase() !== "'approved'" ||
              output.result.toLowerCase() !== "approved" ? (
                <p>
                  <strong>WARNING/RECOMMENDATION:</strong>{" "}
                  <span
                    style={{
                      marginLeft: "10px",
                      fontSize: "18px",
                    }}
                  >
                    {output.warning}
                  </span>
                </p>
              ) : (
                ""
              )}
            </>
          </div>
        </div>
      ) : (
        loading && (
          <div
            style={{
              width: "100%",
              display: "flex",
              marginTop: "30px",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p
              style={{
                marginBottom: "10px",
                fontSize: "20px",
              }}
            >
              Thumbnail Details Processing... It can take 2-3 minutes. Please
              wait...
            </p>
            <Box sx={{ width: "35%" }}>
              <LinearProgress />
            </Box>
          </div>
        )
      )}
    </div>
  );
}

export default ThumbNailMain;
