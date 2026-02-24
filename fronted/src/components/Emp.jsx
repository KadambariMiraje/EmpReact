import React from "react";
import { useLocation } from "react-router-dom";
import ProfilePage from "./ProfilePage";

function EmpPage() {
  const location = useLocation();
  const user = location.state?.user; // get the user from state

  if (!user) {
    return <p>User data not found. Please login again.</p>;
  }

  return <ProfilePage user={user} />; // pass user to your profile component
}

export default EmpPage;