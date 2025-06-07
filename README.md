
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
<img width="931" alt="Landing page" src="https://github.com/user-attachments/assets/3c155f4c-270a-4a5d-b131-f07dd05170c1">

<img width="931" alt="Homepage1" src="https://github.com/user-attachments/assets/84ff75ce-3907-4a89-bd7b-63439609790e">

<img width="931" alt="Homepage2" src="https://github.com/user-attachments/assets/e6ae9ec8-0ec6-4ee7-a3d9-085464970a51">

<img width="931" alt="Homepage3" src="https://github.com/user-attachments/assets/2f0973b8-e960-4adf-bcf2-1b76649aba7f">

2) Login Page
<img width="931" alt="Screenshot 2024-12-08 171743" src="https://github.com/user-attachments/assets/dd690de2-ce82-4c66-9d9c-ae2624e16311">

3) Authenticate with ResVault
<img width="931" alt="Screenshot 2024-12-08 172213" src="https://github.com/user-attachments/assets/27a482bf-557f-43bb-8719-9715e943aed0">

4) Create Polls Screen
<img width="931" alt="Create Poll" src="https://github.com/user-attachments/assets/f9082a84-5639-42fe-8bab-e59407b81dce">

5) View Polls Screen
<img width="931" alt="View Polls" src="https://github.com/user-attachments/assets/70301084-6f23-4e20-9e59-79fa4121e663">

6) Vote Screen
<img width="931" alt="Vote Screen" src="https://github.com/user-attachments/assets/d56dc814-26c2-4f3c-8bd5-1e84aac53cea">

7) Result Screen
<img width="931" alt="Result Screen" src="https://github.com/user-attachments/assets/886d8d7f-dbfb-41bf-ae7c-1104da32df4a">

8) User History Screen
<img width="931" alt="User Vote History" src="https://github.com/user-attachments/assets/89057bcc-4681-4c50-ab3a-6d66ce74f733">

9) Discussion Screen
<img width="931" alt="Discussion Screen" src="https://github.com/user-attachments/assets/f82a65e8-6bf0-4f75-8a02-0b0cf6501f6f">

10) User Dashboard
<img width="931" alt="User Dashboard" src="https://github.com/user-attachments/assets/550fc079-c805-4579-a4e0-015859a0ccfe">

11) Update Profile
<img width="931" alt="Update Profile" src="https://github.com/user-attachments/assets/517c683b-d838-4d8d-8069-dc4a51ad77c8">

# Preparation
Please follow the procedures below and ensure that every step is successful.
## Node.js is required
1. **Node.js** - Download and install Node.js from [https://nodejs.org/](https://nodejs.org/) based on your platform.
2. **npm (Node Package Manager)** - npm is included with Node.js. Run the following commands to ensure your installation is successful.
   ```
   node --version
   npm --version
   ```
## Install ResVault chrome extension
https://chromewebstore.google.com/detail/odnmbbfjnkgboakjpjlcceggpkoaheil?utm_source=item-share-cb
## Steps to run the system
1. Clone this Git repository to your local machine
   ```
   git clone https://github.com/maduyen/VoteChain.git
   cd VoteChain
   ```
2. Install required dependencies
      ```
      npm install
      ```
3. Create a .env file 
   - In the ./backend directory, create a .env file.
   - Add your MongoDB connection string to it using the following format:
      ```
      MONGO_URI=your_mongodb_connection_string
      ```
4. Once the dependencies are installed successfully
   - Open a terminal, run following command
      ```
      npm run start-backend
      ```
   - Open another terminal, run following command
      ```
      npm start
      ```
      This will launch the application, and you can access it in your web browser
5. Connect the ResVault chrome extension, then you can anonymously login to votechain through it
   ![ResVault screen](https://github.com/user-attachments/assets/9afcaeeb-e36d-4d4d-aaf4-724ddf2ba97c)  
   Enjoy your voting!


## For more information
Refer to the Blog - [https://xiuyuanqi799.wixsite.com/expanded-votechain](https://xiuyuanqi799.wixsite.com/expanded-votechain)

