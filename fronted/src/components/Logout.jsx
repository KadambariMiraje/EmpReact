import React, { useContext, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";

function Logout() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(null);           // ← clears the user from context
    navigate("/login");      // ← redirects to login page
  }, []);

  return null;
}

export default Logout;