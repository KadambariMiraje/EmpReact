import React from "react";
import { useLocation } from "react-router-dom";

function Welcome() {
  const location = useLocation();

  const fullname = location.state?.fullname;

  return (
    <div className="text-center mt-5">
      Welcome {fullname ? fullname : "User"}
    </div>
  );
}

export default Welcome;