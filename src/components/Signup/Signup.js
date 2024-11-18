import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { GENERATE_KEYS } from "../utils/ResDbApis";
import { sendRequest } from "../utils/ResDbClient";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import styles from "./Signup.module.css";
import signupImage from "../../assest/signup_undraw.svg"; // Replace with your image path
import { fabClasses } from "@mui/material";

function Signup() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [successMsg, setSuccessMsg] = useState(""); 
  const [resendEmailMsg, setResendEmailMsg] = useState(false);
  
  const handleSubmission = async () => {
    if (!values.name || !values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");
    setSuccessMsg("");
    setSubmitButtonDisabled(true);

    try {
      await createUserWithEmailAndPassword(auth, values.email, values.pass)
        .then(async (res) => {
          setSubmitButtonDisabled(false);
          const user = res.user;

          const res_key = await sendRequest(GENERATE_KEYS);
          let publicKey = "";let privateKey = "";
          //console.log("Generated keys:", res_key);
          if (res_key && res_key.data && res_key.data.generateKeys) { 
            localStorage.setItem("publicKey", res_key.data.generateKeys.publicKey);
            localStorage.setItem("privateKey", res_key.data.generateKeys.privateKey);
            //console.log("Public Key:", localStorage.getItem("publicKey"));
            //console.log("Private Key:", localStorage.getItem("privateKey"));
          }
          localStorage.setItem("name", values.name);
          localStorage.setItem("email", values.email);
          localStorage.setItem("uid", user.uid);

          const docref = await addDoc(collection(db, "users"), {
            uid: user.uid,
            name: values.name,
            email: values.email,
            publicKey: localStorage.getItem("publicKey"), // Replace with your logic
            createdAt: new Date().toISOString(),
          });

          await updateProfile(user, {
            displayName: values.name,
          });

          await sendEmailVerification(user); // Send email verification
          setSuccessMsg("Signup successful! Please check your email to verify your account.");
        });
    } catch (err) {
      setSubmitButtonDisabled(false);

      if (err.code === "auth/email-already-in-use") { // Handle existing account
        const verified = await isEmailVerified(values.email, values.pass);
    
        if (verified) {
          setSuccessMsg("Your email is already verified. You can log in.");
          setResendEmailMsg(false); 
        }
        else {
          setErrorMsg("This email is already registered but not verified.");
          setResendEmailMsg(true);
        }
      } else {
        const errorMessage = err.message.replace(/^Firebase:\s*/, ""); 
        setErrorMsg(errorMessage);
      }
    }
  };

  const isEmailVerified = async (email, password) => {
    try {
      // Temporarily sign in the user
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Reload user to ensure the latest state is fetched
      await user.reload();
  
      // Check if the email is verified
      return user.emailVerified;
    } catch (err) {
      console.error("Error checking email verification:", err.message);
      return false; // Return false if an error occurs (e.g., user not found or wrong credentials)
    }
  };
  
  const handleResendVerification = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.pass);
      const user = userCredential.user;
  
      console.log("Resend User Info:", user);
  
      if (user) {
        await sendEmailVerification(user); // Send verification email
        setSuccessMsg("Verification email resent! Please check your inbox.");
        setResendEmailMsg(false); // Hide the resend link after sending
      }
  
      await auth.signOut();
    } catch (err) {
      const errorMessage = err.message.replace(/^Firebase:\s*/, "");
      setErrorMsg(errorMessage);
    }
  };
  

  const handleInputChange = (event, field) => {
    const { value } = event.target;
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className={styles.container}>
      <Container fluid>
        <Row>
          <Col md={{ size: 4, offset: 1 }}>
            <div className={styles.innerBox}>
              <h1 className={styles.heading}>Signup</h1>
              <Form>
                <FormGroup>
                  <Label for="name">Name</Label>
                  <Input
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    value={values.name}
                    onChange={(e) => handleInputChange(e, "name")}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="Enter email address"
                    value={values.email}
                    onChange={(e) => handleInputChange(e, "email")}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input
                    type="password"
                    id="password"
                    placeholder="Enter password"
                    value={values.pass}
                    onChange={(e) => handleInputChange(e, "pass")}
                  />
                </FormGroup>
                <div className={styles.footer}>
                  <b className={styles.error}>{errorMsg}</b>
                  <b className={styles.success}>{successMsg}</b>
                  {/* Resend Verification Email Button */}
                  {resendEmailMsg && (
                    <div>
                      <Button
                        color="link"
                        onClick={handleResendVerification}
                      >
                        Resend Verification Email
                      </Button>
                    </div>
                  )}

                  {/* Conditionally Render Submit Button */}
                  {!resendEmailMsg && (
                    <Button
                      color="primary"
                      onClick={handleSubmission}
                      disabled={submitButtonDisabled}
                    >
                      Signup
                    </Button>
                  )}

                  <p>
                    Already have an account?{" "}
                    <span>
                      <Link to="/login">Login</Link>
                    </span>
                  </p>
                </div>
              </Form>
            </div>
          </Col>
          <Col md={6}>
            <div className={styles.imageContainer}>
              <img
                src={signupImage}
                alt="Signup"
                className={styles.signupImage}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Signup;

// Update the CSS as per your styling requirements for container, innerBox, footer, etc.
