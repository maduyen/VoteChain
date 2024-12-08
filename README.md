
# VoteChain

## Overview

Welcome to the "VoteChain" – a pioneering platform utilizing ResilientDB and GraphQL, a cutting-edge blockchain technology, to revolutionize the landscape of electronic voting systems. Our primary focus is to ensure a secure and transparent voting process while emphasizing the significance of each voter's singular vote. VoteChain is designed to guarantee the permanence of votes, enabling every participant to cast a single vote per election. Our system strictly prohibits multiple votes, ensuring the integrity and fairness of the electoral process. One of the standout features of VoteChain is its user-friendly interface and the provision of a dedicated admin panel. Within the admin panel, a comprehensive display of all elections and their respective candidates' votes is showcased. These statistics are presented dynamically through visually intuitive representations such as bar graphs, pie charts, and polar area charts. At VoteChain, we are committed to fostering a trustworthy environment where the sanctity of each vote is upheld. Our utilization of ResilientDB technology ensures the highest standards of security, transparency, and reliability in electronic voting, empowering individuals to participate in the democratic process with confidence.

Website Link -- https://kri-hika.github.io/vote-chain/ 

## Features

1) Secure and Transparent Election
2) Single Voting Instance
3) Immutable Votes
4) Limited Access to Results
5) Electronic Vote Visualisation in the Admin Panel
6) User Friendly interface

## Architecture Diagram

<img src="https://github.com/Kri-hika/vote-chain/assets/70900997/2282f2ba-6268-488c-9b79-999b05456be3" alt="Architecture Diagram" width="500">

## Tech Stack

1) **ResilientDB** - A cutting-edge blockchain technology chosen for its robustness and immutability, providing secure, transparent, and tamper-resistant data storage essential for our electronic voting system.
2) **GraphQL** - Utilised for efficient and versatile data querying, offering a streamlined interface to access blockchain based information. Implemented Fetch Transaction, Post Transaction and Send Request APIs using GraphQL.
3) **React.js** - It was utilized for building composable and interactive user interface within the VoteChain platform, facilitating the creation of modular components and seamless UI interactions.
4) **Material UI** - A responsive UI design library complementing React.js, ensured a consistent and visually appealing layout across various devices and screen sizes.
5) **Node.js** - It forms the foundational infrastructure for the VoteChain back end, managing server-side logic and acting as an intermediary between the user interface and ResilientDB blockchain
6) **MongoDB** - ~~Please add description~~

## Screenshots

1) Home Screen
<img width="931" alt="Landing page" src="https://github.com/user-attachments/assets/94acf367-69bd-4363-aad6-bb6e9233f4a9">

<img width="931" alt="Screenshot 2023-12-09 at 4 36 16 PM" src="https://github.com/user-attachments/assets/1b6f55b9-b548-4ddb-b9c0-a7fe2b977a19">

2) Create Polls Screen
<img width="931" alt="Screenshot 2023-12-09 at 4 40 37 PM" src="https://github.com/user-attachments/assets/04d6648e-26ec-4d2d-b916-a065080574de">

3) Vote Polls Screen
<img width="931" alt="Screenshot 2023-12-09 at 4 40 37 PM" src="https://github.com/user-attachments/assets/101543ac-f1f7-4e01-b8d6-ca719753a0b0">

4) Vote Screen
<img width="931" alt="Screenshot 2023-12-09 at 4 40 37 PM" src="https://github.com/user-attachments/assets/6867216a-2d26-4e30-8931-4a9db9ff17c2">

5) Result Screen
<img width="931" alt="Screenshot 2023-12-09 at 4 40 37 PM" src="https://github.com/user-attachments/assets/1829cb3b-c275-4cbf-be84-77456083afb1">

6) User History Screen
<img width="931" alt="Screenshot 2023-12-09 at 4 41 32 PM" src="https://github.com/user-attachments/assets/07e0154f-eec5-4075-a9b6-f8d19871a8ab">

7) Discussion Screen
<img width="931" alt="Screenshot 2023-12-09 at 4 40 37 PM" src="https://github.com/user-attachments/assets/1cc0c76c-9068-4885-9ad6-1e23d91cd524">


## Preparation
Please follow the procedures below and ensure that every step is successful.
### Install resvault chrome extension
Google Chrome is installable on macOS, Linux, and Windows platforms. Please refer to the official Google installation guide based on your platform.
1. Clone the ResVault repo to get started:
   ```
   git clone https://github.com/ResilientApp/ResVault.git
   cd ResVault
   ```
2. Create the build folder in repo
   ```
   npm install
   npm run build
   ```
3. Load the extension in chrome
   - Open chrome://extensions/ in Google Chrome, toggle Developer mode on
   - Click on Load unpacked
   - Select the build folder you just created
   - You should see the ResVault extension in chrome
### Node.js is required
1. **Node.js** - Download and install Node.js from [https://nodejs.org/](https://nodejs.org/) based on your platform.
2. **npm (Node Package Manager)** - npm is included with Node.js. Run the following commands to ensure your installation is successful.
   ```
   node --version
   npm --version
   ```
## Steps to run the system
1. Clone this Git repository to your local machine
   ```
   git clone https://github.com/ItsBaiShiXi/VoteChain.git
   cd VoteChain
   ```
2. Install required dependencies for VoteChain and Backend in VoteChain.
   - Navigate to the VoteChain directory
      ```
      npm install
      ```
   - Navigate to the backend directory in VoteChain directory
      ```
      npm install
      ```
3. Once the dependencies are installed successfully
   - Navigate to the backend directory, launch the backend. (Make sure the server is running on port 3000)
      ```
      cd backend
      node server.js
      ```
   - Navigate to the VoteChain directory, start the development server
      ```
      npm start
      ```
      This will launch the application, and you can access it in your web browser
# Following guides has been deprecated, just for reference
## Steps to run the system 
Please follow the detailed procedure below and ensure that every step is successful.

### Setup Python3.10
Ensure you have Python3.10, otherwise download it and set it up as default.

### Setup ResilientDB
You will need to clone the ResilientDB repo to get started:
```
git clone https://github.com/resilientdb/resilientdb.git
```
Then navigate inside the ResilientDB directory:
```
cd resilientdb
```
Install dependencies:
```
sh INSTALL.sh
```
Run ResilientDB KV Service (this may take a few minutes for the first time):
```
./service/tools/kv/server_tools/start_kv_service.sh
```

### Setup Crow HTTP server, SDK, and GraphQL server
You will need to clone the ResilientDB GraphQL repo to get started:
```
git clone https://github.com/Amoolya-Reddy/ResilientDB-GraphQL
```

Then navigate inside the ResilientDBGraphQL directory:
```
cd ResilientDB-GraphQL
```

Install the Crow dependencies:
```
sudo apt update sudo apt install build-essential sudo apt install python3.10-dev sudo apt install apt-transport-https curl gnupg
```

Build Crow HTTP server (this may take a few minutes for the first time):
```
bazel build service/http_server:crow_service_main
```

Start the Crow HTTP server:
```
bazel-bin/service/http_server/crow_service_main service/tools/config/interface/service.config service/http_server/server_config.config
```

Create virtual environment for the Python SDK:
```
python3 -m venv venv –without-pip
```

Activate the virtual environment:
```
source venv/bin/activate
```

Install pip in the virtual environment for the Python dependencies:
```
curl https://bootstrap.pypa.io/get-pip.py | python
```

Install the Python dependencies:
```
pip install -r requirements.txt
```

Start the GraphQL server:
```
python3 app.py
```

## Setup VoteChain

Follow these steps to set up the development environment and run the application locally.

### Prerequisites

Before you begin, make sure you have the following software installed on your machine:

1. **Node.js** - Download and install Node.js from [https://nodejs.org/](https://nodejs.org/)

2. **npm (Node Package Manager)** - npm is included with Node.js. Ensure that you have the latest version by running the following command in your terminal:

   ```
   npm install
   ```

## Clone the Repository
Clone this Git repository to your local machine using the following command:

 ```
 git clone https://github.com/Kri-hika/vote-chain.git
 ```
   

## Install Dependencies
Navigate to the project directory and install the project dependencies. Run the following commands in your terminal:

 ```
 cd vote-chain
 npm install
 ```
   
This will install all the required dependencies specified in the package.json file.

## Run the Application
Once the dependencies are installed, start the development server to run the application. Run the following command:
    
```
npm start
```

This will launch the application, and you can access it in your web browser at [http://localhost:3000](http://localhost:3000).

## For more information

Refer to the Blog - [https://naitikjain3071.wixsite.com/my-site](https://xiuyuanqi799.wixsite.com/expanded-votechain)

