import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Row, Col } from "reactstrap";
import Navbar from "../Navbar1";
import Footer from "../Footer2";
import voting_home from "../../components/images/voting_home_2.svg";
import election from "../../components/images/election.svg";
import discussion from "../../components/images/discussion.svg";  //added discussion panel image to "images" folder
import transparent from "../../components/images/Electronic Vote Visualisation in the Admin panel.svg";
import immutable from "../../components/images/Immutable_votes.svg";
import blockchain from "../../components/images/blockchain.svg"  //added blockchain image to "images" folder
import customize from "../../components/images/customize.svg"  //added customizable voting mech image to "images" folder
import immutable_vote from "../../components/images/immutable_vote.svg"  //added immutable vote image to "images folder"
import signup from "../../components/images/signup.svg"
import { Button } from "reactstrap";

//adding react-slick for carousel/slider
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(20)
  },
  header: {
    marginBottom: theme.spacing(3),
  },
  navbar: {
    display: "flex",
    justifyContent: "flex-end",
  },
  card: {
    height: "100%",
  },
}));


function Home(props) {
  const classes = useStyles();

  //settings for carousel/Slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="wrapper" style={{ paddingLeft: "2rem", paddingRight: "2rem" }}>
        <section className="section section-lg section-safe">
          <Container>
            <Row className="row-grid justify-content-between">
              <Col md="6">
                <div className="px-md-4 text-left" >
                  <hr className="line-success" />
                  <h1 className="display-1" style={{ color: "#221c1c" }}>VoteChain</h1>
                  <h4 style={{ color: "#555b69" }}>Decentralizing Voting with Blockchain, One Vote at a Time</h4>
                  <p style={{ color: "#555b69" , marginTop: '15px'}}>Experience the future of e-voting with VoteChain - our customizable, secure voting app that offers convenience, transparency, and accessibility for all!</p>
                  <div className="btn-wrapper profile">
                    <Button
                      href="https://xiuyuanqi799.wixsite.com/expanded-votechain"
                      style={{ backgroundColor: "#8fac86" }}>
                      Blog
                    </Button>
                  </div>
                </div>
              </Col>
              <Col md="6">
                <img
                  alt="..."
                  className="img-fluid floating"
                  src={voting_home}
                />
              </Col>
            </Row>
          </Container>
        </section>

        <div className="page-header header-filter">
          <Container>
            <div className="content-center brand">
              <hr className="line-success" />
              <h1 className="display-2 text-center" style={{ color: "#221c1c" }}>How Does VoteChain Work?</h1>
            </div>
          </Container>
        </div>

        <div className="w-3/4 m-auto">
          <Slider {...settings}>
            {data.map((d) => (
              <div className="bg-white h-[420px] text-black rounded-xl">
                <div className="h-60 bg-white flex justify-center items-center rounded-t-xl">
                  <img 
                  style={{ width: '200px', height: '200px' }}
                  className="img-fluid floating"
                  src={d.image} 
                  alt="..."/>
                </div>
              
                <div className="flex flex-col jusify-center items-center p-4">
                  <p className="text-xl font-semibold">{d.section}</p>
                  <p>{d.text}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        <Container className="classes.usestyles">
            <div className="content-center brand">
              <hr className="line-success" />
              <h1 className="display-2" style={{ color: "#221c1c", paddingBottom: "25px"}}>Features</h1>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', backgroundColor: "white", padding: "60px" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: 'center' }}>
                  <img
                    alt="..."
                    style={{ width: '300px', height: '300px' }}
                    className="img-fluid floating"
                    src={customize}  //image for customizable voting
                  />
                  <h3 style={{ marginTop: '25px', color: '#555b69'}}>Customizable Voting Mechanisms</h3>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: 'center' }}>
                  <img
                    alt="..."
                    style={{ width: '300px', height: '300px' }}
                    className="img-fluid floating"
                    src={immutable} 
                  />
                   <h3 style={{ marginTop: '25px', color: '#555b69' }}>Discussion Panels</h3>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: 'center' }}>
                  <img
                    alt="..."
                    style={{ width: '300px', height: '300px' }}
                    className="img-fluid floating"
                    src={transparent}
                  />
                   <h3 style={{ marginTop: '25px', color: '#555b69' }}>Secure and Transparent Voting</h3>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: 'center' }}>
                  <img
                    alt="..."
                    style={{ width: '300px', height: '300px' }}
                    className="img-fluid floating"
                    src={immutable_vote}
                  />
                   <h3 style={{ marginTop: '25px', color: '#555b69' }}>Immutable Votes</h3>
                </div>
              </div>
            </div>
        </Container>

      </div>
      <div>
      <Footer />
      </div>
       
    </div>
  );
}

const data = [
  {
    image: signup,
    section: 'Registration',
    text: 'Create an account today to participate in the upcoming polls! Each voter is assigned a unique digital token that is stored on the blockchain, ensuring identity integrity and preventing unauthorized access.'
  },
  {
    image: election,
    section: 'Get Ready to Vote!',
    text: 'Dive into the details and vote for what you believe in. Explore the topic pages to find essential information about the polls and be prepared to make your voice heard. Your participation is crucial for shaping our community!'
  },
  {
    image: discussion,
    section: 'Participate in Discussions',
    text: 'Poll Creators can create configurable discussion panels with options for public or private access, integrating anonymity features. Users now have the opportunity to provide feedback and engage in conversations about voting topics! Please be mindful when participating 😊'
  },
  {
    image: blockchain,
    section: 'Secured by Blockchain',
    text: 'VoteChain is powered by the ResilientDB and Graph QL blockchain infrastructure. By decentralizing our voting system, we guarantee that voting data is secure and immutable. Poll outcomes are fully determined by the people, creating a transparent voting environment.'
  }
]


export default Home;

