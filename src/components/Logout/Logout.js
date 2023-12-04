import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    auth.signOut().then(() => {
      // Sign-out successful, redirect to the home page
      navigate("/");
      console.log("logout successful");
    }).catch((error) => {
      // An error occurred during sign-out.
      console.error("Error signing out:", error);
    });
  }, [navigate]);

  return (
    <div>
      Logging out...
      {/* You can add a loading spinner or message here */}
    </div>
  );
}

export default Logout;
