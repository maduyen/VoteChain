import React from "react";
import { Row, Col } from "reactstrap";
import Navbar from "../Navbar1";
import Footer from "../Footer2";
import homepage from "../../components/images/homepage.svg";
import homepage_vote from "../../components/images/homepage_vote.svg";
import election from "../../components/images/election.svg";
import discussion from "../../components/images/discussion.svg";
import blockchain from "../../components/images/blockchain.svg";
import customize from "../../components/images/customize.svg";
import signup from "../../components/images/signup.svg";
import piechart from "../../components/images/pie-chart.svg";
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
              <h2 style={{ color: "#f5cfa8", marginBottom: "0px"}}> Introducing... </h2>
              <h1 className="display-1" style={{ color: "#f5cfa8", marginBottom: "0px", fontWeight: 400 }}>
                VoteChain 2.0
              </h1>
              <h4 style={{ color: 'white' }}>
                Decentralizing Voting with Blockchain - One Vote at a Time ✅
              </h4>
              <p style={{ color: 'white' }}>
              Learn more about our latest updates {" "}
                <span
                  onClick={scrollToHowItWorks}
                  style={{
                    color: "#f0c38e",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  below
                </span>
                !
              </p>
              <div className="btn-wrapper profile">
                <Button
                    style={{ backgroundColor: "#f0c38e", color: "#312c51" }}
                    onClick={() => navigate("/login")} // Navigate to Login
                  >
                    Get Started
                </Button>
              </div>
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
            <div
              style={{
              backgroundColor: "#312c51", 
              borderRadius: "50px", 
              padding: "40px", 
              marginTop: "40px", 
              marginLeft: '40px',
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            }}>
              <h4 style={{ color: 'white' }}>
                Experience the future of e-voting with VoteChain - our customizable, secure voting
                platform that offers convenience, transparency, and accessibility for all!
              </h4>
              <div className="btn-wrapper profile">
                <Button
                  style={{
                    marginTop: "10px",
                    backgroundColor: "#f0c38e",
                    color: "#312c51"
                  }}
                  onClick={() => navigate("/polls")} // Navigate to PollsListPage
                >
                  View Polls
                </Button>
              </div>
            </div>
          </div>
        </section>
        <div
          style={{
            backgroundColor: "#312c51", 
            borderRadius: "50px",
            padding: "50px", 
            paddingBottom: "70px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)"
        }}>
          <div id="how-it-works" className="content-center brand">
            <h2 style={{ color: "#f5cfa8", textAlign: 'center', marginBottom: '20px'}}>
              How Does VoteChain Work?
            </h2>
          </div>
          <div className="w-7/8 m-auto px-5">
            <Slider {...settings}>
              {data.map((d) => (
                <div className="bg-[#48426d] h-[500px] text-black rounded-xl" key={d.section}>
                  <div className="h-50 bg-[#48426d] flex justify-center items-center rounded-t-xl">
                    <div className="floating bg-white rounded-full img-fluid floating p-4">
                      <img
                        style={{ width: "150px", height: "150px" }}
                        src={d.image}
                        alt="..."
                      />
                    </div>
                  </div>
                  <div className="flex flex-col jusify-center items-center p-4">
                    <h4 style={{ color: "#f5cfa8" }}>
                      {d.section}
                    </h4>
                    <p style= {{ color: 'white', paddingLeft: '5px', paddingRight: '5px'}}>{d.text}</p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div
          style={{
            backgroundColor: "#312c51", 
            borderRadius: "50px", 
            padding: "40px", 
            marginTop: "80px", 
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            maxWidth: "900px"
          }}>
          <h2 style = {{ color: "#f5cfa8", marginBottom: '5px'}}> Building the Future of Voting 🔨</h2>
          <h4 style = {{ color: 'white' }}> See How:</h4>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <div className="btn-wrapper profile">
                  <Button
                    href="https://xiuyuanqi799.wixsite.com/expanded-votechain"
                    style={{ backgroundColor: "#f0c38e", color: "#312c51" }}
                  >
                  <i className="fas fa-newspaper mr-2"></i> {/* Blog icon */}
                    Read Our Blog
                  </Button>
            </div>
            <div className="btn-wrapper profile">
                  <Button
                    href="https://github.com/maduyen/VoteChain"
                    style={{ backgroundColor: "#f0c38e", color: "#312c51" }}
                  >
                  <i className="fab fa-github mr-2"></i>  {/* GitHub icon */}
                    Visit Our GitHub Repository
                  </Button>
            </div>
            <div className="btn-wrapper profile">
                  <Button
                    href="https://resilientdb.apache.org/"
                    style={{ backgroundColor: "#f0c38e", color: "#312c51" }}
                  >
                  <i className="fas fa-database mr-2"></i> {/* Database icon */}
                    Learn More About ResilientDB
                  </Button>
            </div>
          </div>
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
    image: signup,
    section: 'NEW! Registration',
    text: (<span>VoteChain now uses the Resilient-App <a href="https://github.com/apache/incubator-resilientdb-resvault" style={{textDecoration: "underline"}}>ResVault</a> for user authentication, adding extra security. Users log in with their ResVault Wallet, and poll submissions will be linked to their account for enhanced protection and accountability.</span>)
  },
  {
    image: customize,
    section: 'NEW! Customizable Voting',
    text: 'With our latest update, users can now create and customize their own polls, tailoring voting rules and formats to meet their specific needs! This enhancement ensures a seamless blend of flexibility and security for an optimized voting experience.'
  },
  {
    image: election,
    section: 'Get Ready to Vote!',
    text: 'Dive into the details and vote for what you believe in. Explore the topic pages to find essential information about the polls and be prepared to make your voice heard. Your participation is crucial for shaping our community!'
  },
  {
    image: piechart,
    section: 'NEW! View Poll Results',
    text: 'Poll results are now available to voters! After casting their votes, users can view the poll outcomes. This creates a more interactive experience, and promotes transparency throughout the voting process.'
  },
  {
    image: discussion,
    section: 'NEW! Participate in Discussions',
    text: 'Poll creators can also set up discussion panels with public or private access, supporting anonymous feedback. Users now have the opportunity to engage in conversations about voting topics! Please be mindful when participating 😊'
  },
  {
    image: blockchain,
    section: 'Secured by Blockchain',
    text: (<span>VoteChain is powered by the <a href="https://github.com/apache/incubator-resilientdb" style={{textDecoration: "underline"}}>ResilientDB</a> and <a href="https://github.com/apache/incubator-resilientdb-graphql" style={{textDecoration: "underline"}}>ResilientDB-GraphQL</a> blockchain infrastructures. By decentralizing our voting system, we guarantee that voting data is secure and immutable. Poll outcomes are fully determined by the people, creating a transparent voting environment.</span>)
  }
];

export default Home;
