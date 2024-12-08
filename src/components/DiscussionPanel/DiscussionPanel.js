/* referred to VoteChain/src/components/Login/Login.js for page setup */

import React, { useState, useEffect } from "react";
import { io } from 'socket.io-client';
import styles from "./DiscussionPanel.module.css";
import { Container, Form, Input, Button } from "reactstrap";

function DiscussionPanel() {
    // state to store messages and socket connection
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        //establish socket connection
        const socketConnection = io("http://localhost:3000");

        //set the socket connection in state -> this is needed so it can be used in global scope
        setSocket(socketConnection);

        //log when user connects
        socketConnection.on("connect", () => {
            console.log("Connected to the backend via Socket.IO");
        });

        //listen for messages from the server
        socketConnection.on("message", (data) => {
            console.log("Message from server:", data);
            appendMessages(data); // Add message to the list
        });

        //get old msgs & output
        socketConnection.on("output-messages", (data) => {
            console.log("Message from server:", data);
            if(data.length) {  //if there is previous message(s)
                data.forEach(message => {
                    appendMessages(message.msg); //output message(s)
                })
            }
        });

        //disconnect when user leaves the discussion board
        return () => {
            socketConnection.disconnect();
            console.log("Disconnected from socket");
        };
    }, []); // Empty dependency array ensures this effect runs only once

    //append messages to the state
    function appendMessages(newMessage) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
    }

    //handle sending a new message
    const handleSendMessage = (e) => {
        e.preventDefault();
        if (message.trim() && socket) {  //ensures connection + NOT blank msg
            const formattedMessage = `Voter: ${message}`;  // add "Voter: " to the start of the msg
            socket.emit("chatmessage", formattedMessage); // Send message via socket
            setMessage(""); // Clear the input after sending the message
        }
    };

    return (
        <Container className={styles.container}>
            <div className={styles.innerBox}>
                <h1 className={styles.heading}>Discussion</h1>

                <Form className={styles.formContainer} id="msgForm" onSubmit={handleSendMessage}>
                    <Input 
                        type="text"
                        name="msg"
                        placeholder="Post to Discussion Panel"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}/>
                    <Button className={styles.sendButton}>Send</Button>
                </Form>

                <div className={styles.msgContainer}>
                    <div id="messages" className={styles.discussionMessage}>
                        {messages.map((msg, index) => (
                            <div key={index}>{msg}</div>
                        ))}
                    </div>
                </div>
                
            </div>
        </Container>
    );
}

export default DiscussionPanel;