/* referred to VoteChain/src/components/Login/Login.js for page setup */

import React from "react";
import styles from "./DiscussionPanel.module.css";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";

function DiscussionPanel() {
    //FIXME: add any handling here if needed
    const [values, setValues] = useState({  //FIXME: refer to Login.js for this
        message: ""
      });

    return (
        //FIXME: figure out how to get submission history removed from Form -> it currently shows past messages D:<
        //FIXME: dont use Form for messages
        <Container className={styles.container}>
            <div className={styles.innerBox}>
                <h1 className={styles.heading}>Discussion</h1>

                <Form>
                <FormGroup>
                    <Label for="message">Post to Discussion Panel</Label>
                    <Input
                        type="message"
                        id="message"
                        placeholder="Type message... Please be mindful when participating!"
                        value={values.message}
                        // onChange={(event) =>
                        //   setValues((prev) => ({ ...prev, email: event.target.value }))
                        // }
                    />
                </FormGroup>

                </Form>
            </div>
        </Container>
    );
}

export default DiscussionPanel;