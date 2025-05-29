import React, { useEffect, useState, useContext } from "react";
import Navbar from "./Navbar1";
import Footer from "./Footer2";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const UserDashboard = () => {
    const publicKey = sessionStorage.getItem('publicKey');
    const linkStyle = { color: "white", marginRight: "15px" };

    /* Profile Information */
    const [userName, setUserName] = useState("");
    const [about, setAbout] = useState("");
    const [profilePicUrl, setProfilePicUrl] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                if (!publicKey) return;

                const res = await fetch(`http://localhost:3000/api/profile/${publicKey}`);
                if (!res.ok) throw new Error("Failed to fetch profile");
                
                const data = await res.json();
                console.log("Fetched profile data:", data);
                setUserName(data.userName || "");
                setAbout(data.about || "");
                setProfilePicUrl(data.profilePicUrl || "");
            } catch (err) {
                console.error("Error fetching profile info:", err);
            }
        };

        fetchProfile();
    }, [publicKey]);
    
    return (
        <div>
            {/* Navbar */}
            <div>
                <Navbar />
            </div>

            {/* Dashboard */}
            <div className="min-h-screen flex flex-col px-6 mt-[100px]">
            <h1 className="font-medium text-[#f5cfa8] text-4xl mb-4">Dashboard</h1> 
                {/* Body */}
                <div className="min-h-screen flex flex-row">
                    {/* Side Bar */}
                    <div className="w-[300px] max-h bg-[#312c51] rounded-[50px] shadow-lg flex-col mr-4">

                        <h2 className="text-white text-2xl"> Welcome Back, </h2>   
                        <h2 className="text-white text-2xl"> {userName || "Voter"} </h2>   
                        <p className="text-white mb-4">Public Key: {publicKey}</p> {/* Display Public Key */}
                        <Button component={Link} to="/updateprofile" style={linkStyle}>
                            Edit Profile
                        </Button>
                    </div>
                    <div className="max-w h-[200px] bg-[#312c51] rounded-[50px] shadow-lg flex-col">
                         <Button component={Link} to="/userinfo" style={linkStyle}>
                            YOUR VOTES
                        </Button>
                    </div>
                </div>
        
            </div>

            {/* Footer */}
            <div className="pt-4">
                <Footer />
            </div>
        </div>
    );
}

export default UserDashboard;
