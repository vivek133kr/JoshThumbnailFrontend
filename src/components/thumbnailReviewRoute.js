import { useContext, useEffect, useState } from "react";

import { useNavigate, Navigate, useParams } from "react-router-dom";
import { ThumbnailDataContext } from "../context/thumbnailReviewDataContext";

export const ThumbnailReviewPrivateRoute = ({ children }) => {
  const { id } = useParams();
let [login, setLogin] = useState(localStorage.getItem(`thumbnail_review_login`));
  if (
    login === "false" ||
    login == undefined
  ) {
    return <Navigate to={`/thumbnail-review/login`} />;
  }
  return children;
};
