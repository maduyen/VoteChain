import React, { useState, useEffect, useContext, useRef } from "react";
import ResVaultSDK from "resvault-sdk";
import { GlobalContext } from "../context/GlobalContext";
import { fetchTransactionDetails } from "./utils/ResilientDB";
import Navbar from "./Navbar1";
import Footer from "./Footer2";
import profile from "./images/profile.svg"

const sdk = new ResVaultSDK();

const UpdateProfile = () => {
    const { publicKey, setPublicKey } = useContext(GlobalContext);

    const [transactionId, setTransactionId] = useState(null);
    const [userName, setUserName] = useState("");
    const [profilePicUrl, setProfilePicUrl] = useState("");
    const [about , setAbout] = useState("");

    const sdkRef = useRef(sdk); // Ref to manage SDK instance

    const handleProfilePicUpload = (event) => setProfilePicUrl(event.target.files[0]);

    const handleSubmit = async () => {
        try {
        if (!publicKey) {
            alert("You must be logged in to update your profile.");
            return;
        }

        const profileData = {
            userName,
            about,
        };

        const message = {
            type: "commit",
            direction: "commit",
            amount: "1",
            data: profileData,
            recipient: publicKey,
        };

        console.log("Submitting profile update:", message);
        sdkRef.current.sendMessage(message);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    useEffect(() => {
        const messageHandler = async (event) => {
        const message = event.data;
        if (message.data?.success) {
            const txnId = message.data.data.postTransaction?.id;
            if (txnId) {
            setTransactionId(txnId);
            }
        } else {
            console.error("Failed to update profile:", message);
        }
        };

        sdkRef.current.addMessageListener(messageHandler);
        return () => sdkRef.current.removeMessageListener(messageHandler);
    }, []);

    useEffect(() => {
        const storeProfileInMongoDB = async () => {
        if (transactionId) {
            try {
            const profileData = {
                userName,
                about,
                updatedAt: new Date().toISOString(),
            };

            const response = await fetch("http://localhost:3000/api/profile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    transactionId,
                    publicKey,
                    profileData: {
                        userName,
                        about,
                        profilePicUrl,
                    },
                }),
            });

            if (response.ok) {
                alert("Profile updated successfully!");
            } else {
                console.error("MongoDB update failed:", await response.text());
            }
            } catch (error) {
                console.error("Error storing profile:", error);
            }
        }
        };

        storeProfileInMongoDB();
    }, [transactionId]);

    return (
        <div>
            {/* Navbar */}
            <div>
                <Navbar />
            </div>

            {/* Back Button */}
            <div className="absolute top-[90px] left-5 z-10">
            <button
                onClick={() => window.history.back()}
                className="text-[#312c51] bg-[#f0c38e] hover:bg-[#d9ab78] rounded-3xl px-4 py-2"
            >
                ◄ Go Back
            </button>
            </div>

            {/* Body */}
            <div className="min-h-screen flex flex-col items-center justify-center py-10 px-6">
                {/* Header */}
                <div className="w-full flex justify-start items-end mt-4 max-w-4xl mx-auto">
                <h1 className="font-medium text-[#f5cfa8] text-4xl mb-[50px]">Update Profile</h1>
                <img
                    src={profile}
                    alt="..."
                    className="img-fluid floating"
                    style={{ width: "180px", height: "180px", marginLeft: '12px'}}
                />
                </div>
                <div className="w-full max-w-4xl bg-[#312c51] rounded-3xl shadow-lg p-10">
                    {/* Account Info */}
                    <div className="mb-10">
                        <h2 className="text-2xl font-semibold text-[#f5cfa8] mt-2 mb-4">Account Info 📋</h2>
                        <div className="space-y-4 w-full max-w-4xl bg-[#48426d] rounded-3xl shadow-lg p-10">
                        <input
                            type="text"
                            placeholder="Username (optional)"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="w-full p-4 border border-gray-300 rounded-3xl shadow-sm focus:ring-2 focus:ring-blue-400"
                        />
                        <textarea
                            placeholder="About (optional)"
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                            className="w-full p-4 border border-gray-300 rounded-3xl shadow-sm focus:ring-2 focus:ring-blue-400"
                        />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-[#4caf68] text-white py-4 rounded-3xl shadow-lg hover:bg-[#44995b] transition duration-200 text-xl mb-2"
                    >
                        Submit Changes
                    </button>
                </div>
            </div>  

            {/* Footer */}
            <div className="pt-4">
                <Footer />
            </div>
        </div>
    );
}

export default UpdateProfile;