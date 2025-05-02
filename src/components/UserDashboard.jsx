import React from "react";
import Navbar from "./Navbar1";
import Footer from "./Footer2";

const UserDashboard = () => {
    const publicKey = sessionStorage.getItem('publicKey');

    return (
        <div>
            {/* Navbar */}
            <div>
                <Navbar />
            </div>

            {/* Dashboard */}
            <div className="min-h-screen flex flex-col px-6 mt-[100px]">
                {/* Header */}
                <h1 className="font-medium text-[#f5cfa8] text-4xl mb-4">Dashboard</h1> 
                <h2 className="text-white text-3xl mb-4"> Welcome Back, </h2>   
                <p className="text-white mb-4">Public Key: {publicKey}</p> {/* Display Public Key */}
            </div>

            {/* Footer */}
            <div className="pt-4">
                <Footer />
            </div>
        </div>
    );
}

export default UserDashboard;
