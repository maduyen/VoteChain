// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { signInWithEmailAndPassword } from "firebase/auth";

// import InputControl  from "../InputControl/InputContol";
// import { auth } from "../../firebase";

// import styles from "./Login.module.css";

// function Login() {
//   const navigate = useNavigate();
//   const [values, setValues] = useState({
//     email: "",
//     pass: "",
//   });
//   const [errorMsg, setErrorMsg] = useState("");
//   const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

//   const handleSubmission = () => {
//     if (!values.email || !values.pass) {
//       setErrorMsg("Fill all fields");
//       return;
//     }
//     setErrorMsg("");

//     setSubmitButtonDisabled(true);

//     // Will redirect to results page

//     if (values.email === "n@gmail.com" && values.pass === "123456") {
//       // Redirect to Candidates page
//       navigate("/candidates");
//       setSubmitButtonDisabled(false);
//       return;
//     }

//     signInWithEmailAndPassword(auth, values.email, values.pass)
//       .then(async (res) => {
//         setSubmitButtonDisabled(false);
        
//         navigate("/elections");
//       })
//       .catch((err) => {
//         setSubmitButtonDisabled(false);
//         setErrorMsg(err.message);
//       });
//   };
//   return (
//     <div className={styles.container}>
//       <div className={styles.innerBox}>
//         <h1 className={styles.heading}>Login</h1>

//         <InputControl
//           label="Email"
//           onChange={(event) =>
//             setValues((prev) => ({ ...prev, email: event.target.value }))
//           }
//           placeholder="Enter email address"
//         />
//         <InputControl
//           label="Password"
//           type="password"
//           onChange={(event) =>
//             setValues((prev) => ({ ...prev, pass: event.target.value }))
//           }
//           placeholder="Enter Password"
          
//         />

//         <div className={styles.footer}>
//           <b className={styles.error}>{errorMsg}</b>
//           <button disabled={submitButtonDisabled} onClick={handleSubmission}>
//             Login
//           </button>
//           <p>
//             Already have an account?{" "}
//             <span>
//               <Link to="/signup">Signup</Link>
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import styles from "./Login.module.css";
import loginImage from "../images/Untitled_design-removebg-preview.png"
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

    if (values.email === "n@gmail.com" && values.pass === "123456") {
      // Redirect to Candidates page
      navigate("/candidates");
      setSubmitButtonDisabled(false);
      return;
    }

    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        navigate("/elections");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };

  return (
    <Container className={styles.container}>
      {/* <Row className="justify-content-center"> */}
<Row className="justify-content-center">
      <Col md="6" className={styles.imageCol}>
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
                  Already have an account?{" "}
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
