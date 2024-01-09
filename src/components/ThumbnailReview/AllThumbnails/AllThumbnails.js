import React, { useEffect, useState } from "react";
import { useNavigate, Navigate, useParams } from "react-router-dom";

import UPSClogo from "../elements/jt-logo-color.png";
import "@fontsource/open-sans";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function AllThumbnails() {
  let [data, setData] = useState([]);

  let [loading, setLoading] = useState(true);
  useEffect(() => {
    document.title = "Thumbnails";
    document.body.style.backgroundColor = "#f3f6f8";
  }, []); //
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let response = await fetch("http://localhost:3005/get-all-thumbnails");
      let responseData = await response.json();
      const sortedData = responseData.sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );
      const formattedData = sortedData.map((item) => {
        const updatedAtDate = new Date(item.updatedAt);
        const formattedDate = `${
          updatedAtDate.getMonth() + 1
        }/${updatedAtDate.getDate()}/${updatedAtDate.getFullYear()}`;
        return {
          ...item,
          updatedAt: formattedDate,
        };
      });

      setData(formattedData);

      setLoading(false);
    } catch (error) {}
  };
  return (
    <div
      style={{
        width: "100vw",
        fontFamily: "Open Sans",
        marginBottom: "100px",
      }}
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

        {/* Empty div to take up available space */}
        <button
          style={{
            position: "absolute",
            right: "10px", // Adjust the distance from the right edge as needed
            padding: "10px",
            background:"white",
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

      {loading === false ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "60px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "30px",
              alignItems: "center",
            }}
          >
            {data &&
              data.map((item) => (
                <div
                  style={{
                    width: "60%",
                    display: "flex",
                    border: "1px solid black",
                    padding: "30px",
                    borderRadius: "12px",
                    backgroundColor: "white",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                  key={item.id}
                >
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    src={item.imageUrl}
                    alt={item.id + "img"}
                  />
                  <p>
                    <b>Transcription:</b>{" "}
                    <span
                      style={{
                        marginLeft: "10px",
                      }}
                    >
                      {" "}
                      {item.title}
                    </span>
                  </p>
                  <p>
                    <b>Status:</b>{" "}
                    <span
                      style={{
                        backgroundColor: "white",
                        marginLeft: "10px",
                        padding: "5px 10px",
                        border: "0.5px solid black",
                        borderRadius: "5px",
                        color: item.approvalStatus
                          .toLowerCase()
                          .includes("approved")
                          ? "green"
                          : "red",
                      }}
                    >
                      {" "}
                      {item.approvalStatus.charAt(0).toUpperCase() +
                        item.approvalStatus.slice(1)}
                    </span>
                  </p>

                  <p>
                    {" "}
                    <b>Name: </b>
                    <span
                      style={{
                        marginLeft: "10px",
                      }}
                    >
                      {item.userName}
                    </span>
                  </p>
                  <p>
                    {" "}
                    <b>Email: </b>
                    <span
                      style={{
                        marginLeft: "10px",
                      }}
                    >
                      {item.userEmail}
                    </span>
                  </p>
                  {item.approvalStatus.includes("rejected") && (
                    <p>
                      <b>Reason: </b>
                      <span
                        style={{
                          marginLeft: "10px",
                        }}
                      >
                        {item.approvalStatusReason}
                      </span>
                    </p>
                  )}
                  {item.updatedAt && (
                    <p>
                      <b>Updated At: </b>
                      <span
                        style={{
                          marginLeft: "10px",
                        }}
                      >
                        {item.updatedAt}
                      </span>
                    </p>
                  )}
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "60px",
          }}
        >
          <CircularProgress />
        </div>
      )}
    </div>
  );
}

export default AllThumbnails;
