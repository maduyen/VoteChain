import React, { useEffect, useState, useContext } from "react";
import Navbar from "./Navbar1";
import Footer from "./Footer2";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import dashboardAvatar from "./images/dashboardAvatar.svg";
import dashboardHistory from "./images/dashboardHistory.svg"
import dashboardCreatePoll from "./images/dashboardCreatePoll.svg";

const UserDashboard = () => {
    const navigate = useNavigate(); // Hook for navigation

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
                <div className="flex flex-row items-start">
                    {/* Side Bar */}
                    <div className="w-[350px] bg-[#f0c38e] rounded-[50px] shadow-lg flex flex-col p-4 mr-5">
                        <img
                            src={dashboardAvatar}
                            alt="..."
                            className="img-fluid floating mx-auto"
                            style={{ width: "180px", height: "180px", marginTop: "5px", marginBottom: "20px"}}
                        />
                        {/* Welcome Message for User */}
                        <h2 className="font-bold text-[#312c51] text-2xl"> Welcome Back, </h2>   
                        <h2 className="font-medium text-[#312c51] text-2xl text-center pb-3"> {userName || "Voter"} </h2> 
                        {/* About Section (optional) */}
                        <p className="text-[#312c51] text-sm px-2 mb-4 text-center italic">
                            {about }
                        </p>
                        {/* Update Profile Button */}
                        <button
                            className="w-64 mx-auto bg-[#312c51] text-white py-3 rounded-3xl shadow-lg hover:bg-[#423867] transition duration-200"
                            onClick={() => navigate("/updateprofile")} // Navigate to UpdateProfile
                            >
                            Edit Profile
                        </button>
                    </div>
                    {/* Dashboard Options */}
                    <div className="min-h-screen flex flex-col">
                        {/* Top Row */}
                        {/* PublicKey container */}
                        <div className="max-w h-[110px] bg-[#312c51] rounded-[25px] shadow-lg flex-col p-4 mb-4">
                            <p className="font-bold text-xl text-white mb-1">Public Key 🔑:</p> {/* Display Public Key */}
                            <p className="text-white ml-4">{publicKey}</p>
                        </div>
                        {/* Bottom Row */}
                        <div className="min-h-screen flex flex-row">
                            {/* Vote History container */}
                            <div className="w-[450px] h-[325px] bg-[#312c51] rounded-[50px] shadow-lg flex flex-col items-center justify-center mr-5">
                                    <img
                                    src={dashboardHistory}
                                    alt="..."
                                    className="img-fluid floating mx-auto"
                                    style={{ width: "180px", height: "180px", marginBottom: "20px"}}
                                />
                                <button
                                    className="w-64 bg-[#f0c38e] text-[#312c51] py-3 rounded-3xl shadow-lg hover:bg-[#d9ab78] transition duration-200"
                                    onClick={() => navigate("/userinfo")} // Navigate to PollsListPage
                                    >
                                    View Vote History
                                </button>
                            </div>
                            {/* Create Poll container */}
                            <div className="w-[350px] h-[325px] bg-[#312c51] rounded-[50px] shadow-lg flex flex-col items-center justify-center">
                                    <img
                                    src={dashboardCreatePoll}
                                    alt="..."
                                    className="img-fluid floating mx-auto"
                                    style={{ width: "180px", height: "180px", marginBottom: "20px"}}
                                />
                                <button
                                    className="w-48 bg-[#f0c38e] text-[#312c51] py-3 rounded-3xl shadow-lg hover:bg-[#d9ab78] transition duration-200"
                                    onClick={() => navigate("/create-poll")} // Navigate to PollsListPage
                                    >
                                    + Create Poll
                                </button>
                            </div>
                        </div>
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
