import React, { useState, useEffect } from "react";

const Userinfo = () => {

  const [userInfo, setUserInfo] = useState({
    name: localStorage.getItem("name"),
    email: localStorage.getItem("email"),
    id: localStorage.getItem("uid"),
    publicKey: localStorage.getItem("publicKey"),
    privateKey: localStorage.getItem("privateKey"),
  });

  // Simulate fetching user info from a server or authentication service
  useEffect(() => {
    // In a real app, you could fetch data from Firebase or your API here
    // Example:
    // fetchUserInfoFromAuth().then(data => setUserInfo(data));
  }, []);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>User Information</h1>
      <p><strong>Name:</strong> {userInfo.name}</p>
      <p><strong>Email:</strong> {userInfo.email}</p>
      <p><strong>ID:</strong> {userInfo.id}</p>
      <p><strong>Public Key:</strong> {userInfo.publicKey}</p>
      <p><strong>Private Key:</strong> {userInfo.privateKey}</p>
    </div>
  );
};

export default Userinfo;
