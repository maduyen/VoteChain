import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import styles from "./Login.module.css";
import loginImage from "../../assest/login_undraw.svg"

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if (!values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);

    // Will redirect to results page

    if (values.email === "admin_votechain@gmail.com" && values.pass === "123456") {
      navigate("/results");
      setSubmitButtonDisabled(false);
      return;
    }

    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        const user = res.user;
        if (!user.emailVerified) {
          auth.signOut(); // Log them out
          setSubmitButtonDisabled(false);
          setErrorMsg("Please verify your email before logging in.");
        } else {
          //console.log("User Info:", user);
          setSubmitButtonDisabled(false);
          navigate("/elections");
        }
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        const errorMessage = err.message.replace(/^Firebase:\s*/, ""); 
        setErrorMsg(errorMessage);
      });
  };

  return (
    <Container className={styles.container}>
      <Row className="justify-content-center">
        <Col md="6" className={styles.imageCol} style={{paddingRight: "50px"}}>
          {/* Left half of the page for the image */}
          <div className={styles.imageContainer}>
            <img src={loginImage} alt="Login" className={styles.loginImage} />
          </div>
        </Col>
        <Col md="6">
          <div className={styles.innerBox}>
            <h1 className={styles.heading}>Login</h1>

            <Form>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter email address"
                  value={values.email}
                  onChange={(event) =>
                    setValues((prev) => ({ ...prev, email: event.target.value }))
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Enter Password"
                  value={values.pass}
                  onChange={(event) =>
                    setValues((prev) => ({ ...prev, pass: event.target.value }))
                  }
                />
              </FormGroup>
              <div></div>

              {errorMsg && <Alert color="danger">{errorMsg}</Alert>}
              <div className={styles.footer}>
                <Button
                  color="primary"
                  disabled={submitButtonDisabled}
                  onClick={handleSubmission}
                >
                  {submitButtonDisabled ? "Logging in..." : "Login"}
                </Button>
                <p>
                  Don't have an account?{" "}
                  <span>
                    <Link to="/signup">Signup</Link>
                  </span>
                </p>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
