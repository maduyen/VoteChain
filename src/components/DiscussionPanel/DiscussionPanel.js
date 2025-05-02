/* referred to VoteChain/src/components/Login/Login.js for page setup */

import React, { useState, useEffect } from "react";
import { io } from 'socket.io-client';
import styles from "./DiscussionPanel.module.css";
import { Container, Form, Input, Button } from "reactstrap";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar1";

function DiscussionPanel() {
    const { transactionId } = useParams(); //access curr transactionID

    // state to store messages, socket connection, and topic
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [socket, setSocket] = useState(null);
    const [pollTopic, setPollTopic] = useState("");

    useEffect(() => {
        //establish socket connection
        const socketConnection = io("http://localhost:3000");

        //set the socket connection in state -> this is needed so it can be used in global scope
        setSocket(socketConnection);

        //log when user connects
        socketConnection.on("connect", () => {
            console.log("Connected to the backend via Socket.IO");
            socketConnection.emit("joinPanel", transactionId);
        });

        //listen for poll topic from the server
        socketConnection.on("poll-topic", (topic) => {
            setPollTopic(topic); //set the poll topic in the state
        });

        //listen for messages from the server
        socketConnection.on("message", (data) => {
            console.log("Message from server:", data);
            appendMessages(data); //add message to the list
        });

        //get old msgs & output
        socketConnection.on("output-messages", (data) => {
            console.log("Previous message(s) from server:", data);
            if(data.length) {  //if there is previous message(s)
                data.forEach(message => {
                    appendMessages(message); //output message(s)
                })
            }
        });

        //disconnect when user leaves the discussion board
        return () => {
            socketConnection.disconnect();
            console.log("Disconnected from socket");
        };
    }, [transactionId]);

    //append messages to the state
    function appendMessages(newMessage) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
    }

    //handle sending a new message
    const handleSendMessage = (e) => {
        e.preventDefault();
        if (message.trim() && socket) {  //ensures connection + NOT blank msg
            const formattedMessage = { transactionId, sender: "Voter", msg: message };  // add "Voter: " to the start of the msg
            socket.emit("chatmessage", formattedMessage); // send message via socket
            setMessage(""); // clear Input after sending the message
        }
    };

    return (
        <div>
        <Navbar />
      
        {/* Back Button */}
        <div className={styles.backButton}>
          <button
            onClick={() => window.history.back()}
            className="text-[#312c51] bg-[#f0c38e] hover:bg-[#d9ab78] rounded-3xl px-4 py-2"
          >
            ◄ Go Back
          </button>
        </div>
      
        {/* Main Discussion Panel */}
        <Container className={styles.container}>
          <h1 className={styles.heading}>Discussion: {pollTopic}</h1>
          <div className={styles.innerBox}>
            <Form className={styles.formContainer} id="msgForm" onSubmit={handleSendMessage}>
              <Input
                type="text"
                name="msg"
                placeholder="Post to Discussion Panel"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
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
      </div>
    );
}

export default DiscussionPanel;