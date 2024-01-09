import React from 'react'
import { useContext, useEffect, useState } from "react";

import { useNavigate, Navigate, useParams } from "react-router-dom";

export const ThumbnailloginRoute = ({children}) => {
  const { id } = useParams();
  let [login, setLogin] = useState(
    localStorage.getItem(`thumbnail_review_login`)
  );
  if (login === "true") {
    return <Navigate to={`/thumbnail-review`} />;
  }
  return children;
}

