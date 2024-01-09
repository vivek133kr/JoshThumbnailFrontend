import { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";

import "@fontsource/inter";

import { GoogleLogin } from "@react-oauth/google";

import ControlledCarousel from "./Carousal.js";

import Image from "./Image1.png";

import UPSCLogo from "./jt-logo-color.png";

import { useNavigate, useParams } from "react-router-dom";

import { Alert, CircularProgress } from "@mui/material";
import { ThumbnailDataContext } from "../../../context/thumbnailReviewDataContext.js";
// import { RequestLeadDataContext } from "../../../context/requestLeadsdataContext.js";

export default function ThumbnailLoginModal({}) {
  const [widthTotal, setWidth] = useState(window.innerWidth);

  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(false);



  const navigate = useNavigate();
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    document.body.style.backgroundColor = "#F4F6F8";
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: widthTotal > "800" ? "70vw" : "100%",
    height: widthTotal > "800" ? "80%" : "100%",

    backgroundColor: "white",

    borderRadius: "15px",
    p: 4,
  };

  const slides = [
    {
      url: Image,
    },
  ];

  useEffect(() => {
    document.title = "Thumbnail Review - Login";
  }, []); //
  return (
    <div>
      <div>
        <Box
          sx={style}
          style={{
            display: "flex",

            padding: "0px",
            margin: "0px",
          }}
        >
          {widthTotal > 800 ? (
            <div
              style={{
                width: "60%",
                height: "100%",
                margin: "0px",
                padding: "0px",
              }}
            >
              <ControlledCarousel slides={slides} />
            </div>
          ) : (
            ""
          )}
          <div
            style={{
              width: widthTotal > 800 ? "50%" : "100vh",
              height: widthTotal < 800 ? "100vh" : "",
              margin: "0px",
              backgroundColor: "white",

              display: "flex",
              flexDirection: "column",

              justifyContent: widthTotal < "800" ? "center" : "",
              alignItems: "center",
              padding: widthTotal < 800 ? "1%" : "",
            }}
          >
            <div
              style={{
                backgroundColor: widthTotal < 800 ? "white" : "",
                borderRadius: "20px",
                boxShadow: "10px black",
              }}
            >
              <div
                style={{
                  width: widthTotal > "600" ? "fit-content" : "90%",

                  padding: "2%",
                  margin: "4%",
                  marginTop: widthTotal > "600" ? "5%" : "0px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",

                    alignItems: "center",
                  }}
                >
                  <img
                    style={{
                      width: "120px",
                    }}
                    src={UPSCLogo}
                    alt="d"
                  />
                  <p
                    style={{
                      fontFamily: "Inter",

                      fontStyle: "normal",
                      fontWeight: "600",
                      color: "#2385C7",
                      width: "fit-content",
                      textAlign: "center",
                      fontSize: "20px",
                      lineHeight: "34px",
                    }}
                  >
                    Thumbnail Review
                  </p>
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "90%",
                      display: "flex",

                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-start",
                      marginTop: widthTotal < "600" ? "3%" : "30px",
                    }}
                  >
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                      style={{
                        fontFamily: "Inter",
                        fontStyle: "normal",
                        fontWeight: "600",
                        fontSize: "28.025px",
                        lineHeight: "34px",
                      }}
                    >
                      Sign In
                    </Typography>
                    <Typography
                      id="modal-modal-description"
                      sx={{ mt: 2 }}
                      style={{
                        fontFamily: "Inter",
                        fontStyle: "normal",
                        fontWeight: 500,
                        textAlign: "left",
                        fontSize: "14.5px",
                        lineHeight: "18px",
                      }}
                    >
                      Please log in with JoshTalks Email Account.
                    </Typography>
                  </div>
                </div>
                {error && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Alert
                      severity="error"
                      style={{
                        width: "100%",
                        backgroundColor: "white",

                        display: "flex",

                        padding: "0px",
                        margin: "0px",
                        justifyContent: "center",
                        marginTop: "20px",
                        fontFamily: "Inter",
                        fontStyle: "normal",
                        fontWeight: 500,
                        textAlign: "left",
                        fontSize: "14.5px",
                      }}
                    >
                      Invalid Credentials
                    </Alert>
                  </div>
                )}
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    position: "relative",

                    marginTop: error ? "2%" : "15%",

                    justifyContent: "center",
                  }}
                >
                  {/* {loading&& <div
                      style={{
                        position: "absolute",
                        backgroundColor: "white",
                        width: "100%",
                        height: "105%",
                        border:"20px solid white",

                      
                        zIndex: 9999,
                      }}
                    ></div>
               } */}
                  <GoogleLogin
                    clientId="555163836458-ekq299o1li21bvqavnppmuqjt66vv95o.apps.googleusercontent.com"
                    onSuccess={(response) => {
                      console.log(response, " line 240");
                      setLoading(true);
                      fetch(
                        " https://app.joshtalks.org/api/skill/v1/forms/get_info/",
                        {
                          method: "GET",
                          headers: {
                            Authorization: response.credential,
                          },
                        }
                      )
                        .then((res) => res.json())
                        .then((res) => {
                          console.log(res, " line 253");
                          if (
                            res.detail &&
                            res.detail.includes(
                              "Authentication credentials were not provided."
                            )
                          ) {
                            setError(true);

                            setTimeout(() => {
                              setError(false);
                            }, 2000);

                            setLoading(false);
                          } else {
                            if (res && res.email.includes("@joshtalks.com")) {
                              setTimeout(() => {
                                
                                localStorage.setItem(
                                  "thumbnail-review-user-email",
                                  res.email
                                );
                                  
                                localStorage.setItem(
                                  "thumbnail-review-first-name",
                                  res.first_name
                                );
                               localStorage.setItem(
                                 "thumbnail_review_login",
                                true
                               );
                                setLoading(false);

                                navigate("/thumbnail-review")
                              }, 0);
                            } else {
                              // Handle case where the email doesn't match
                              // You can show an error message or redirect to a login page
                              setError(true);

                              setTimeout(() => {
                                setError(false);
                              }, 2000);
                              setLoading(false);
                            }
                          }
                        });
                    }}
                    onFailure={(response) => {
                      console.log(response);
                    }}
                  />
                </div>

                {loading && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "60px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        width: "fit-content",
                        alignItems: "center",
                      }}
                    >
                      <CircularProgress
                        style={{
                          width: "20px",
                          height: "20px",
                        }}
                      />
                      <p
                        style={{
                          marginLeft: "20px",
                          fontFamily: "Inter",
                          fontStyle: "normal",
                          color: "#2385C7",
                          fontWeight: 500,
                          textAlign: "left",
                          fontSize: "14.5px",
                          lineHeight: "18px",
                        }}
                      >
                        Logging In ...
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* {error ? (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Alert
                  severity="error"
                  style={{
                    display: "flex",
                    width: "84%",
                    justifyContent: "center",
                    marginTop: "2%",
                  }}
                >
                  Invalid Credentials! Try Again
                </Alert>
              </div>
            ) : (
              ""
            )} */}
          </div>
        </Box>
      </div>
    </div>
  );
}
