import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

const withAuthProtection = (WrappedComponent) => {
  const AuthGuard = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      // Check if user is logged in
      const currentUser = auth.currentUser;
      if (!currentUser) {
        // If user is not logged in, redirect to login page
        navigate("/login");
      }
    }, [navigate]);

    // If user is logged in, render the protected component
    return <WrappedComponent {...props} />;
  };

  return AuthGuard;
};

export default withAuthProtection;