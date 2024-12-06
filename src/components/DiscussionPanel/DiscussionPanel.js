/* referred to VoteChain/src/components/Login/Login.js for page setup */

import React from "react";
import { io } from 'socket.io-client';
import styles from "./DiscussionPanel.module.css";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";

function DiscussionPanel() {
    //connect to server

    //const socket = io("http://localhost:3000"); // Ensure this matches the backend's URL


    return (
        //FIXME: figure out how to get submission history removed from Form -> it currently shows past messages D:<
        //FIXME: dont use Form for messages
        <Container className={styles.container}>
            <div className={styles.innerBox}>
                <h1 className={styles.heading}>Discussion</h1>

                <Form className={styles.formContainer} id="msgForm" action="">
                    <Input 
                        type="text"
                        name="msg"
                        placeholder="Post to Discussion Panel"/>
                    <Button className={styles.sendButton}>Send</Button>
                </Form>
                <div id="messages"></div>
            </div>
        </Container>
    );
}

export default DiscussionPanel;