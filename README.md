
# VoteChain

## Overview

Welcome to the "VoteChain" – a pioneering platform utilizing ResilientDB and GraphQL, a cutting-edge blockchain technology, to revolutionize the landscape of electronic voting systems. Our primary focus is to ensure a secure and transparent voting process while emphasizing the significance of each voter's singular vote. VoteChain is designed to guarantee the permanence of votes, enabling every participant to cast a single vote per election. Our system strictly prohibits multiple votes, ensuring the integrity and fairness of the electoral process. One of the standout features of VoteChain is its user-friendly interface and the provision of a dedicated admin panel. Within the admin panel, a comprehensive display of all elections and their respective candidates' votes is showcased. These statistics are presented dynamically through visually intuitive representations such as bar graphs, pie charts, and polar area charts. At VoteChain, we are committed to fostering a trustworthy environment where the sanctity of each vote is upheld. Our utilization of ResilientDB technology ensures the highest standards of security, transparency, and reliability in electronic voting, empowering individuals to participate in the democratic process with confidence.

## Features

1) Secure and Transparent Election
2) Single Voting Instance
3) Immutable Votes
4) User Friendly Interface
5) User Authentication with ResVault
6) Customizable Voting
7) Participate in Discussion Panels
8) View Poll Results & Personal Vote History
9) NEW! User Dashboard
10) NEW! Custom Usernames and Bios
11) NEW! App Refresh

## Architecture Diagram
<img src="https://github.com/user-attachments/assets/e3344304-5da8-4f2b-a545-836900a4f08e" alt="Architecture Diagram" width="500">

## Tech Stack

1) **ResilientDB** - A cutting-edge blockchain technology chosen for its robustness and immutability, providing secure, transparent, and tamper-resistant data storage essential for our electronic voting system.
2) **GraphQL** - Utilised for efficient and versatile data querying, offering a streamlined interface to access blockchain based information. Implemented Fetch Transaction, Post Transaction and Send Request APIs using GraphQL.
3) **React.js** - It was utilized for building composable and interactive user interface within the VoteChain platform, facilitating the creation of modular components and seamless UI interactions.
4) **Material UI** - A responsive UI design library complementing React.js, ensured a consistent and visually appealing layout across various devices and screen sizes.
5) **Node.js** - It forms the foundational infrastructure for the VoteChain back end, managing server-side logic and acting as an intermediary between the user interface and ResilientDB blockchain
6) **ResVault** - VoteChain now uses ResVault for user authentication. Users will log in with their ResVault Wallet, and poll submissions will be linked to their account for enhanced protection and accountability.
7) **MongoDB** - The Custom Poll Creation and Discussion Panel features utilize MongoDB to securely store transaction-related data such as Poll Topics, Vote Options, and Messages. This data is organized into three collections: Poll, Vote, and Message Data, ensuring efficient management and retrieval of information.

## Screenshots

1) Home Screen
<img width="931" alt="Landing page" src="https://github.com/user-attachments/assets/3f3e76f6-1d81-4ca1-a257-ecaefdbf6e7d">

<img width="931" alt="Screenshot 2023-12-09 at 4 36 16 PM" src="https://github.com/user-attachments/assets/1b6f55b9-b548-4ddb-b9c0-a7fe2b977a19">

2) Login Page
<img width="931" alt="Screenshot 2024-12-08 171743" src="https://github.com/user-attachments/assets/dd690de2-ce82-4c66-9d9c-ae2624e16311">

3) Authenticate with ResVault
<img width="931" alt="Screenshot 2024-12-08 172213" src="https://github.com/user-attachments/assets/27a482bf-557f-43bb-8719-9715e943aed0">

4) Create Polls Screen
<img width="931" alt="Screenshot 2023-12-09 at 4 40 37 PM" src="https://github.com/user-attachments/assets/04d6648e-26ec-4d2d-b916-a065080574de">

5) Vote Polls Screen
<img width="931" alt="Screenshot 2023-12-09 at 4 40 37 PM" src="https://github.com/user-attachments/assets/101543ac-f1f7-4e01-b8d6-ca719753a0b0">

6) Vote Screen
<img width="931" alt="Screenshot 2023-12-09 at 4 40 37 PM" src="https://github.com/user-attachments/assets/6867216a-2d26-4e30-8931-4a9db9ff17c2">

7) Result Screen
<img width="931" alt="Screenshot 2023-12-09 at 4 40 37 PM" src="https://github.com/user-attachments/assets/1829cb3b-c275-4cbf-be84-77456083afb1">

8) User History Screen
<img width="931" alt="Screenshot 2023-12-09 at 4 41 32 PM" src="https://github.com/user-attachments/assets/07e0154f-eec5-4075-a9b6-f8d19871a8ab">

9) Discussion Screen
<img width="931" alt="Screenshot 2024-12-08 212205" src="https://github.com/user-attachments/assets/ace0250f-da24-48b1-ba0b-a1588c90665e">


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
2. Install required dependencies
      ```
      npm install
      ```
3. Once the dependencies are installed successfully
   - Open a terminal, run following command
      ```
      npm run start-backend
      ```
   - Open another terminal, run following command
      ```
      npm start
      ```
      This will launch the application, and you can access it in your web browser
4. Connect the ResVault chrome extension, then you can anonymously login to votechain through it
   ![ResVault screen](https://github.com/user-attachments/assets/9afcaeeb-e36d-4d4d-aaf4-724ddf2ba97c)  
   Enjoy your voting!


## For more information
Refer to the Blog - [https://xiuyuanqi799.wixsite.com/expanded-votechain](https://xiuyuanqi799.wixsite.com/expanded-votechain)

