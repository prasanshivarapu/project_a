import React, { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import SignupForm from "../file5";
import "./index.css";

const GoogleAuth = () => {
  const [user, setUser] = useState(null);
  //  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),

    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    document.title = "prasan";
  });

  console.log(user);
  useEffect(() => {
    if (user) {
      fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: "application/json",
          },
        }
      );

      Cookies.set("token", 12345, { expires: 30 });
      navigate("/fill");
    }
  }, [user]);

  const logOut = () => {
    googleLogout();
  };

  // Empty dependency array to run the effect only once

  return (
    <div>
      <button className="gin" onClick={login}>
        G
      </button>
    </div>
  );
};

export default GoogleAuth;
