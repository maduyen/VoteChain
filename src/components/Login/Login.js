import React, { useEffect, useRef, useState } from "react";
import ResVaultSDK from "resvault-sdk";
import "../../App.css";
import resvaultLogo from "../../assest/resilientdb.svg";
import NotificationModal from "../NotificationModal";
import { useNavigate } from "react-router-dom";
import lottie from "lottie-web";
import animation from "../../assest/animation.json";

const Login = () => {
  const sdkRef = useRef(null);
  const navigate = useNavigate(); // React Router hook for navigation
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const animationContainer = useRef(null);

  // Initialize ResVault SDK
  if (!sdkRef.current) {
    sdkRef.current = new ResVaultSDK();
    console.log("ResVaultSDK initialized:", sdkRef.current);
  }

  // Animation setup
  useEffect(() => {
    if (animationContainer.current) {
      const instance = lottie.loadAnimation({
        container: animationContainer.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: animation,
      });

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            instance.play();
          } else {
            instance.pause();
          }
        });
      });

      observer.observe(animationContainer.current);

      return () => {
        instance.destroy();
        observer.disconnect();
      };
    } else {
      console.error("Animation container is not defined");
    }
  }, []);

  // Message listener
  useEffect(() => {
    const sdk = sdkRef.current;
    if (!sdk) {
      console.error("SDK is not available");
      return;
    }

    const messageHandler = (event) => {
      console.log("Message received:", event);
      const message = event.data;

      if (
        message &&
        message.type === "FROM_CONTENT_SCRIPT" &&
        message.data &&
        message.data.success !== undefined
      ) {
        if (message.data.success) {
          const token = message.data.token; // Extract token
          sessionStorage.setItem("token", token); // Store the token
          console.log("Authentication successful. Redirecting...");
          navigate("/elections"); // Redirect to your original signed-in page
        }
      } else if (
        message &&
        message.type === "FROM_CONTENT_SCRIPT" &&
        message.data &&
        message.data === "error"
      ) {
        setModalTitle("Authentication Failed");
        setModalMessage(
          "Please connect ResVault to this ResilientApp and try again."
        );
        setShowModal(true);
        console.error("Authentication failed. Error received.");
      } else {
        console.warn("Unexpected message received:", message);
      }
    };

    sdk.addMessageListener(messageHandler);
    console.log("Message listener added.");

    return () => {
      sdk.removeMessageListener(messageHandler);
      console.log("Message listener removed.");
    };
  }, [navigate]);

  // Handle authentication
  const handleAuthentication = () => {
    if (sdkRef.current) {
      console.log("Attempting to send login message...");
      sdkRef.current.sendMessage(
        {
          type: "login",
          direction: "login",
        },
        (response) => {
          console.log("Response from sendMessage:", response);
        }
      );
    } else {
      setModalTitle("Error");
      setModalMessage("SDK is not initialized.");
      setShowModal(true);
      console.error("SDK is not initialized.");
    }
  };

  // Close modal
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <div className="page-container">
        <div className="form-container">
          <h2 className="heading">Resilient App</h2>

          <div ref={animationContainer} className="animation-container"></div>

          <div className="form-group text-center mb-4">
            <label className="signin-label">Sign In Via</label>
            <button
              type="button"
              className="btn btn-secondary oauth-button"
              onClick={handleAuthentication}
            >
              <div className="logoBox">
                <img src={resvaultLogo} alt="ResVault" className="oauth-logo" />
              </div>
              <span className="oauth-text">ResVault</span>
            </button>
          </div>
        </div>
      </div>

      <NotificationModal
        show={showModal}
        title={modalTitle}
        message={modalMessage}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default Login;
