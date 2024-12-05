import React from "react";
import { Row, Col } from "reactstrap";
import Navbar from "../Navbar1";
import Footer from "../Footer2";
import homepage from "../../components/images/homepage.svg";
import homepage_vote from "../../components/images/homepage_vote.svg";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

import './Home.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Home(props) {
  const navigate = useNavigate(); // Hook for navigation

  // Settings for carousel/Slider
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2.1,
    slidesToScroll: 1,
  };

  function scrollToHowItWorks() {
    document.getElementById("how-it-works").scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div className="wrapper" style={{ paddingLeft: "4rem", paddingRight: "4rem" }}>
        <section className="section section-lg section-safe">
          <div style={{ display: "flex", alignItems: "center" }}>
            <div>
              <h1 className="display-1" style={{ color: "#221c1c", marginBottom: "0px" }}>
                VoteChain 2.0
              </h1>
              <h4 style={{ color: "#555b69" }}>
                Decentralizing Voting with Blockchain, One Vote at a Time ✅
              </h4>
              <p style={{ color: "#555b69" }}>
                Read about VoteChain's latest updates{" "}
                <span
                  onClick={scrollToHowItWorks}
                  style={{
                    color: "#8fac86",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  below
                </span>
                !
              </p>
              <Button
                style={{
                  marginTop: "20px",
                  backgroundColor: "#8fac86",
                  color: "#fff",
                }}
                onClick={() => navigate("/polls")} // Navigate to PollsListPage
              >
                View Polls
              </Button>
            </div>
            <img
              src={homepage}
              alt="..."
              className="img-fluid floating"
              style={{ width: "600px", height: "600px" }}
            />
          </div>

          <div style={{ display: "flex", alignItems: "flex-start" }}>
            <img
              src={homepage_vote}
              alt="..."
              className="img-fluid floating"
              style={{ width: "600px", height: "600px" }}
            />
            <div>
              <h4 style={{ color: "#555b69", marginTop: "15px" }}>
                Experience the future of e-voting with VoteChain - our customizable, secure voting
                app that offers convenience, transparency, and accessibility for all!
              </h4>
              <div className="btn-wrapper profile">
                <Button
                  href="https://xiuyuanqi799.wixsite.com/expanded-votechain"
                  style={{ backgroundColor: "#8fac86" }}
                >
                  Blog
                </Button>
              </div>
            </div>
          </div>
        </section>
        <div id="how-it-works" className="content-center brand">
          <h1 className="display-2 text-center" style={{ color: "#221c1c" }}>
            How Does VoteChain Work?
          </h1>
        </div>
        <div className="w-3/4 m-auto">
          <Slider {...settings}>
            {data.map((d) => (
              <div className="bg-white h-[520px] text-black rounded-xl" key={d.section}>
                <div className="h-60 bg-white flex justify-center items-center rounded-t-xl">
                  <img
                    style={{ width: "200px", height: "200px" }}
                    className="img-fluid floating"
                    src={d.image}
                    alt="..."
                  />
                </div>
                <div className="flex flex-col jusify-center items-center p-4">
                  <p className="text-xl font-semibold" style={{ color: "#8fac86" }}>
                    {d.section}
                  </p>
                  <p>{d.text}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <div style={{ paddingTop: "6rem" }}>
        <Footer />
      </div>
    </div>
  );
}

const data = [
  {
    image: homepage_vote,
    section: "NEW! Registration",
    text: (
      <span>
        VoteChain now uses the Resilient-App{" "}
        <a
          href="https://github.com/apache/incubator-resilientdb-resvault"
          style={{ textDecoration: "underline" }}
        >
          ResVault
        </a>{" "}
        for user authentication, adding extra security. Users log in with their ResVault Wallet,
        and poll submissions will be linked to their account for enhanced protection and
        accountability.
      </span>
    ),
  },
  // More data sections...
];

export default Home;
