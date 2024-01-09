import "./App.css";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import React, { useContext, useEffect } from "react";

import { GoogleOAuthProvider } from "@react-oauth/google";

import { ThumbnailReviewPrivateRoute } from "./components/thumbnailReviewRoute";
import ThumbNailMain from "./components/ThumbnailReview/ThumbNailMain";
import ThumbnailLoginModal from "./components/ThumbnailReview/elements/ThumbnailLogin";
import { ThumbnailloginRoute } from "./components/thumbnailloginRoute";
import AllThumbnails from "./components/ThumbnailReview/AllThumbnails/AllThumbnails";


function App() {
  let navigate = useNavigate();

  const location = useLocation();
  const { pathname } = location;

  return (
    <div>
    <Routes>
        <Route
          path={`/thumbnail-review`}
          element={
            <GoogleOAuthProvider clientId="555163836458-ekq299o1li21bvqavnppmuqjt66vv95o.apps.googleusercontent.com">
              <ThumbnailReviewPrivateRoute>
                <ThumbNailMain />
              </ThumbnailReviewPrivateRoute>
            </GoogleOAuthProvider>
          }
        />
        <Route
          path={`/thumbnails`}
          element={
            <ThumbnailReviewPrivateRoute>
              <AllThumbnails />
            </ThumbnailReviewPrivateRoute>
          }
        />
        <Route
          path={`/thumbnail-review/login`}
          element={
            <GoogleOAuthProvider clientId="555163836458-ekq299o1li21bvqavnppmuqjt66vv95o.apps.googleusercontent.com">
              <ThumbnailloginRoute>
                <ThumbnailLoginModal />
              </ThumbnailloginRoute>
            </GoogleOAuthProvider>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
