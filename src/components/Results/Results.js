// import React, { useEffect, useState } from 'react';
// import * as XLSX from 'xlsx';
// import { sendRequest } from '../utils/ResDbClient';
// import { FETCH_TRANSACTION } from '../utils/ResDbApis';
// import Chart from 'chart.js/auto';
// import Navbar from '../Navbar';
// import Footer from '../Footer';
// const ResultsPage = () => {
//   const [voterList, setVoterList] = useState([]);
//   const [isCalculated, setIsCalculated] = useState(false);
//   const [chartData, setChartData] = useState(null);

//   let electionResults = {};
//   useEffect(() => {
//       fetchTransactions();
//   }, []);
//   const fetchTransactions = async (electionId) => {
    
//     try {
//       // Fetch transactions using the FETCH_TRANSACTION API
//       const res = await sendRequest(FETCH_TRANSACTION("B8GFzNi6vfVhA9crXSC2S8s9K2eoNJd1HhwEbCLwT6gC", "B8GFzNi6vfVhA9crXSC2S8s9K2eoNJd1HhwEbCLwT6gC"));
    
//       console.log("Fetch Transactions Response:", res); // Log the response
      
//       if (res && res.data && res.data.getFilteredTransactions) {
//         // Process the transaction data as needed
//         console.log("Fetched Transactions:", res.data.getFilteredTransactions); // Log the fetched transactions
//         let voters = [...voterList];
//         res.data.getFilteredTransactions?.forEach(element => {
//           let json = JSON.parse(element.asset.replace(/'/g, '"')).data;
//           voters.push(json);

//           let candidateId = json["candidateId"];
//           let electionId = json["electionId"];
          
//            // Check if electionId exists in electionResults
//           if (!(electionId in electionResults)) {
//             electionResults[electionId] = {};
//           }

//           // Check if candidateId exists in electionResults[electionId]
//           if (!(candidateId in electionResults[electionId])) {
//             electionResults[electionId][candidateId] = 0;
//           }

//           // Increment the count for the specific candidateId and electionId
//           electionResults[electionId][candidateId]++;
          
          
//           console.log(electionId, candidateId, electionResults[electionId][candidateId]);
          

//           // electionResults[json["electionId"]][candidate]++;
         
//         });
//         setVoterList(voters);
//         setIsCalculated(true);
//         console.log(electionResults) 
//         console.log("Election Results[1]", electionResults[1])
//         console.log("Election Results[1][1]", electionResults[1][1]) 
//         console.log("Election Results[1][2]", electionResults[1][2]) // Use Election Results to display the graph
//       }
//     } catch (error) {
//       console.error("Error fetching transactions:", error);
//       // Handle error scenarios here
//     }
//   };

//   // const [data, setData] = useState([]);

//   // useEffect(() => {
//   //   // Load the Excel file
//   //   const fetchData = async () => {
//   //     const file = '/components/example1.xlsx'; // Update the path to your Excel file
//   //     const response = await fetch(file);
//   //     const blob = await response.blob();
//   //     const reader = new FileReader();
//   //     reader.onload = () => {
//   //       const data = new Uint8Array(reader.result);
//   //       const workbook = XLSX.read(data, { type: 'array' });
//   //       const sheetName = workbook.SheetNames[0]; // Assuming data is in the first sheet
//   //       const worksheet = workbook.Sheets[sheetName];
//   //       const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
//   //       setData(excelData);
//   //     };
//   //     reader.readAsArrayBuffer(blob);
//   //   };

//   //   fetchData();
//   // }, []);

  
// useEffect(() => {
//   // Your data to be displayed in the bar chart
//   const data = {
//     labels: ['Candidate 1', 'Candidate 2', 'Candidate 3'],
//     datasets: [
//       {
//         label: 'Constituency A',
//         data: [electionResults[1][1], electionResults[1][2], electionResults[1][3]],
//         backgroundColor: [
//           'rgba(255, 99, 132, 0.5)',
//           'rgba(54, 162, 235, 0.5)',
//           'rgba(255, 206, 86, 0.5)',
//         ],
//         borderColor: [
//           'rgba(255, 99, 132, 1)',
//           'rgba(54, 162, 235, 1)',
//           'rgba(255, 206, 86, 1)',
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   setChartData(data);
// }, []);

// useEffect(() => {
//   if (chartData) {
//     const ctx = document.getElementById('myBarChart');
//     new Chart(ctx, {
//       type: 'bar',
//       data: chartData,
//       options: {
//         scales: {
//           y: {
//             beginAtZero: true,
//           },
//         },
//       },
//     });
//   }
// }, [chartData]);

//   return (
//    <>
//    <Navbar />
//    <div>
//   <h2>Bar Chart Example</h2>
//   <div style={{ width: '500px', height: '300px' }}>
//     <canvas id="myBarChart" width="500" height="300"></canvas>
//   </div>
// </div>
//    <Footer />
  
//    </>
//     // <div>
//     //   <h1>Excel Data</h1>
//     //   <table style={{ borderCollapse: 'collapse', border: '2px solid black', width: '100%' }}>
//     //     <thead>
//     //       <tr>
//     //         {data.length > 0 &&
//     //           data[0].map((header, index) => (
//     //             <th key={index} style={{ border: '2px solid black', padding: '8px' }}>{header}</th>
//     //           ))}
//     //       </tr>
//     //     </thead>
//     //     <tbody>
//     //       {data.length > 1 &&
//     //         data.slice(1).map((row, rowIndex) => (
//     //           <tr key={rowIndex}>
//     //             {row.map((cell, cellIndex) => (
//     //               <td key={cellIndex} style={{ border: '2px solid black', padding: '8px' }}>{cell}</td>
//     //             ))}
//     //           </tr>
//     //         ))}
//     //     </tbody>
//     //   </table>
//     // </div>
//   );
// };

// export default ResultsPage;

// // import React, { useEffect, useState } from 'react';
// // import Chart from 'chart.js/auto';

// // const ResultsPage = () => {
// //   const [chartData, setChartData] = useState(null);

// //   useEffect(() => {
// //     // Your data to be displayed in the bar chart
// //     const data = {
// //       labels: ['January', 'February', 'March', 'April', 'May'],
// //       datasets: [
// //         {
// //           label: 'Sample Bar Chart',
// //           data: [65, 59, 80, 81, 56],
// //           backgroundColor: [
// //             'rgba(255, 99, 132, 0.5)',
// //             'rgba(54, 162, 235, 0.5)',
// //             'rgba(255, 206, 86, 0.5)',
// //             'rgba(75, 192, 192, 0.5)',
// //             'rgba(153, 102, 255, 0.5)',
// //           ],
// //           borderColor: [
// //             'rgba(255, 99, 132, 1)',
// //             'rgba(54, 162, 235, 1)',
// //             'rgba(255, 206, 86, 1)',
// //             'rgba(75, 192, 192, 1)',
// //             'rgba(153, 102, 255, 1)',
// //           ],
// //           borderWidth: 1,
// //         },
// //       ],
// //     };

// //     setChartData(data);
// //   }, []);

// //   useEffect(() => {
// //     if (chartData) {
// //       const ctx = document.getElementById('myBarChart');
// //       new Chart(ctx, {
// //         type: 'bar',
// //         data: chartData,
// //         options: {
// //           scales: {
// //             y: {
// //               beginAtZero: true,
// //             },
// //           },
// //         },
// //       });
// //     }
// //   }, [chartData]);

// //   return (
// //     <div>
// //       <h2>Bar Chart Example</h2>
// //       <div style={{ width: '500px', height: '300px' }}>
// //         <canvas id="myBarChart" width="500" height="300"></canvas>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ResultsPage;


//Chatgpt - 3:14


// const ResultsPage = () => {
//   const [voterList, setVoterList] = useState([]);
//   const [isCalculated, setIsCalculated] = useState(false);
//   const [chartData, setChartData] = useState(null);
//   const [electionResults, setElectionResults] = useState({});
//   const [electionIds, setElectionIds] = useState([]);
//   const [datasets, setDatasets] = useState([]);
//   useEffect(() => {
//     fetchTransactions();
//   }, []);

//   const fetchTransactions = async () => {
//     try {
//       const res = await sendRequest(FETCH_TRANSACTION("B8GFzNi6vfVhA9crXSC2S8s9K2eoNJd1HhwEbCLwT6gC", "B8GFzNi6vfVhA9crXSC2S8s9K2eoNJd1HhwEbCLwT6gC"));

//       if (res && res.data && res.data.getFilteredTransactions) {
//         let voters = [...voterList];
//         let updatedResults = { ...electionResults };

//         res.data.getFilteredTransactions?.forEach(element => {
//           let json = JSON.parse(element.asset.replace(/'/g, '"')).data;
//           voters.push(json);

//           let candidateId = json["candidateId"];
//           let electionId = json["electionId"];

//           if (!(electionId in updatedResults)) {
//             updatedResults[electionId] = {};
//           }

//           if (!(candidateId in updatedResults[electionId])) {
//             updatedResults[electionId][candidateId] = 0;
//           }

//           updatedResults[electionId][candidateId]++;
//         });

//         setVoterList(voters);
//         setIsCalculated(true);
//         setElectionResults(updatedResults);
//         setElectionIds(Object.keys(electionResults));
//         console.log("Election Results: ",electionResults);
//         console.log("updated Results", updatedResults)
//       }
//     } catch (error) {
//       console.error("Error fetching transactions:", error);
//     }
//   };

//   // useEffect(() => {
//   //   if (isCalculated) {
//   //     const data = {
//   //       labels: ['Candidate 1', 'Candidate 2', 'Candidate 3'],
//   //       datasets: [
//   //         {
//   //           label: 'Constituency A',
//   //           data: [
//   //             electionResults[1]?.[1] || 0,
//   //             electionResults[1]?.[2] || 0,
//   //             electionResults[1]?.[3] || 0,
//   //           ],
//   //           backgroundColor: [
//   //             'rgba(255, 99, 132, 0.5)',
//   //             'rgba(54, 162, 235, 0.5)',
//   //             'rgba(255, 206, 86, 0.5)',
//   //           ],
//   //           borderColor: [
//   //             'rgba(255, 99, 132, 1)',
//   //             'rgba(54, 162, 235, 1)',
//   //             'rgba(255, 206, 86, 1)',
//   //           ],
//   //           borderWidth: 1,
//   //         },
//   //       ],
//   //     };

//   //     setChartData(data);
//   //   }
//   // }, [isCalculated, electionResults]);

//   // useEffect(() => {
//   //   if (chartData) {
//   //     const ctx = document.getElementById('myBarChart');
//   //     Chart.getChart(ctx)?.destroy();
//   //     new Chart(ctx, {
//   //       type: 'bar',
//   //       data: chartData,
//   //       options: {
//   //         scales: {
//   //           y: {
//   //             beginAtZero: true,
//   //           },
//   //         },
//   //       },
//   //     });
//   //   }
//   // }, [chartData]);

//   //modified for dynamic Election Results 3:32
//   useEffect(() => {
//     if (isCalculated) {
//       // Extract unique election IDs from electionResults
//       //const electionIds = Object.keys(electionResults);

//       // Create datasets dynamically based on electionResults
//       const newDatasets = electionIds.map((electionId, index) => {
//         const dataValues = [
//           electionResults[electionId]?.[1] || 0,
//           electionResults[electionId]?.[2] || 0,
//           electionResults[electionId]?.[3] || 0,
//         ];

//         return {
//           label: `Election ${electionId}`,
//           data: dataValues,
//           backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`,
//           borderColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`,
//           borderWidth: 1,
//         };
//       });
//       setDatasets(newDatasets);

//       const data = {
//         labels: ['Candidate 1', 'Candidate 2', 'Candidate 3'],
//         datasets: newDatasets,
//       };

//       setChartData(data);
//     }
//   }, [isCalculated, electionResults, electionIds]);

//   useEffect(() => {
//     if (chartData && datasets.length > 0) {
//       // Destroy existing charts if they exist
//       electionIds.forEach((electionId) => {
//         const ctx = document.getElementById(`myBarChart${electionId}`);
//         Chart.getChart(ctx)?.destroy();
//       });

//       // Create a new Chart instance for each election
//       electionIds.forEach((electionId, index) => {
//         const canvas = document.createElement('canvas');
//         canvas.id = `myBarChart${electionId}`;
//         canvas.width = 500;
//         canvas.height = 300;

//         document.getElementById('chartContainer').appendChild(canvas);

//         const newCtx = document.getElementById(`myBarChart${electionId}`);
//         new Chart(newCtx, {
//           type: 'bar',
//           data: {
//             labels: ['Candidate 1', 'Candidate 2', 'Candidate 3'],
//             datasets: [datasets[index]],
//           },
//           options: {
//             scales: {
//               y: {
//                 beginAtZero: true,
//               },
//             },
//           },
//         });
//       });
//     }
//   }, [chartData, electionIds, datasets]);

//   // return (
//   //   <>
//   //     <Navbar />
//   //     <div>
//   //       <h2>Bar Chart Example</h2>
//   //       {/* <div style={{ width: '500px', height: '300px' }}>
//   //         <canvas id="myBarChart" width="500" height="300"></canvas>
//   //       </div> */}

//   //     </div>
//   //     <Footer />
//   //   </>
//   // );
//   return (
//     <>
//       <Navbar />
//       <div>
//         <h2>Bar Chart Example</h2>
//         <div id="chartContainer">
//           {/* Charts will be dynamically appended here */}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default ResultsPage;


//Before!! - 442 line mainnnnn - bar chart working code
// import React, { useEffect, useState } from 'react';
// import * as XLSX from 'xlsx';
// import { sendRequest } from '../utils/ResDbClient';
// import { FETCH_TRANSACTION } from '../utils/ResDbApis';
// import Chart from 'chart.js/auto';
// import Navbar from '../Navbar';
// import Footer from '../Footer';

// const ResultsPage = () => {
//   const [voterList, setVoterList] = useState([]);
//   const [isCalculated, setIsCalculated] = useState(false);
//   const [chartData, setChartData] = useState(null);
//   const [electionResults, setElectionResults] = useState({});
//   const [electionIds, setElectionIds] = useState([]);
//   const [datasets, setDatasets] = useState([]);

//   useEffect(() => {
//     fetchTransactions();
//   }, []);

//   const fetchTransactions = async () => {
//     try {
//       const res = await sendRequest(FETCH_TRANSACTION("B8GFzNi6vfVhA9crXSC2S8s9K2eoNJd1HhwEbCLwT6gC", "B8GFzNi6vfVhA9crXSC2S8s9K2eoNJd1HhwEbCLwT6gC"));

//       if (res && res.data && res.data.getFilteredTransactions) {
//         let voters = [];
//         let updatedResults = {};

//         res.data.getFilteredTransactions?.forEach(element => {
//           let json = JSON.parse(element.asset.replace(/'/g, '"')).data;
//           voters.push(json);

//           let candidateId = json["candidateId"];
//           let electionId = json["electionId"];

//           if (!(electionId in updatedResults)) {
//             updatedResults[electionId] = {};
//           }

//           if (!(candidateId in updatedResults[electionId])) {
//             updatedResults[electionId][candidateId] = 0;
//           }

//           updatedResults[electionId][candidateId]++;
//         });

//         setVoterList(voters);
//         setIsCalculated(true);
//         setElectionResults(updatedResults);
//         setElectionIds(Object.keys(updatedResults));
//         console.log("Election Results: ", updatedResults);
//       }
//     } catch (error) {
//       console.error("Error fetching transactions:", error);
//     }
//   };


  

//   useEffect(() => {
//     if (isCalculated) {
//       // Create datasets dynamically based on electionResults
//       const newDatasets = electionIds.map((electionId, index) => {
//         const dataValues = [
//           electionResults[electionId]?.[1] || 0,
//           electionResults[electionId]?.[2] || 0,
//           electionResults[electionId]?.[3] || 0,
//         ];

//         return {
//           label: `Election ${electionId}`,
//           data: dataValues,
//           // backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`,
//           // borderColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`,
//           backgroundColor: [
//                         'rgba(255, 99, 132, 0.5)',
//                         'rgba(54, 162, 235, 0.5)',
//                         'rgba(255, 206, 86, 0.5)',
//                       ],
//                       borderColor: [
//                         'rgba(255, 99, 132, 1)',
//                         'rgba(54, 162, 235, 1)',
//                         'rgba(255, 206, 86, 1)',
//                       ],
//           borderWidth: 1,
//         };
//       });
//       setDatasets(newDatasets);

//       const data = {
//         labels: ['Candidate 1', 'Candidate 2', 'Candidate 3'],
//         datasets: newDatasets,
//       };

//       setChartData(data);
//     }
//   }, [isCalculated, electionResults, electionIds]);

//   useEffect(() => {
//     if (chartData && datasets.length > 0) {
//       // Destroy existing charts if they exist
//       electionIds.forEach((electionId) => {
//         const ctx = document.getElementById(`myBarChart${electionId}`);
//         Chart.getChart(ctx)?.destroy();
//       });

//       // Create a new Chart instance for each election
//       electionIds.forEach((electionId, index) => {
//         const canvas = document.createElement('canvas');
//         canvas.id = `myBarChart${electionId}`;
//         canvas.width = 500;
//         canvas.height = 300;

//         document.getElementById('chartContainer').appendChild(canvas);

//         const newCtx = document.getElementById(`myBarChart${electionId}`);
//         new Chart(newCtx, {
//           type: 'bar',
//           data: {
//             labels: ['Candidate 1', 'Candidate 2', 'Candidate 3'],
//             datasets: [datasets[index]],
//           },
//           options: {
//             scales: {
//               y: {
//                 beginAtZero: true,
//               },
//             },
//           },
//         });
//       });
//     }
//   }, [chartData, electionIds, datasets]);

// return (
//   <>
//     <Navbar />
//     <div style={{margin: '3rem', padding: '3rem' }}>
//       <h2>Bar Chart Example</h2>
//       <div id="chartContainer" style={{ margin: '1rem',display: 'flex', flexDirection: 'column' }}>
//         {/* Charts will be dynamically appended here */}
//       </div>
//     </div>
//     <Footer />
//   </>
// );

// };

// export default ResultsPage;

//After 6:38pm - bar and pie working code
// import React, { useEffect, useState } from 'react';
// import * as XLSX from 'xlsx';
// import { sendRequest } from '../utils/ResDbClient';
// import { FETCH_TRANSACTION } from '../utils/ResDbApis';
// import Chart from 'chart.js/auto';
// import Navbar from '../Navbar';
// import Footer from '../Footer';

// const ResultsPage = () => {
//   const [voterList, setVoterList] = useState([]);
//   const [isCalculated, setIsCalculated] = useState(false);
//   const [chartData, setChartData] = useState(null);
//   const [electionResults, setElectionResults] = useState({});
//   const [electionIds, setElectionIds] = useState([]);
//   const [barChartDatasets, setBarChartDatasets] = useState([]);
//   const [pieChartDatasets, setPieChartDatasets] = useState([]);

//   useEffect(() => {
//     fetchTransactions();
//   }, []);

//   const fetchTransactions = async () => {
//     try {
//       const res = await sendRequest(FETCH_TRANSACTION("B8GFzNi6vfVhA9crXSC2S8s9K2eoNJd1HhwEbCLwT6gC", "B8GFzNi6vfVhA9crXSC2S8s9K2eoNJd1HhwEbCLwT6gC"));

//       if (res && res.data && res.data.getFilteredTransactions) {
//         let voters = [];
//         let updatedResults = {};

//         res.data.getFilteredTransactions?.forEach(element => {
//           let json = JSON.parse(element.asset.replace(/'/g, '"')).data;
//           voters.push(json);

//           let candidateId = json["candidateId"];
//           let electionId = json["electionId"];

//           if (!(electionId in updatedResults)) {
//             updatedResults[electionId] = {};
//           }

//           if (!(candidateId in updatedResults[electionId])) {
//             updatedResults[electionId][candidateId] = 0;
//           }

//           updatedResults[electionId][candidateId]++;
//         });

//         setVoterList(voters);
//         setIsCalculated(true);
//         setElectionResults(updatedResults);
//         setElectionIds(Object.keys(updatedResults));
//       }
//     } catch (error) {
//       console.error("Error fetching transactions:", error);
//     }
//   };

//   useEffect(() => {
//     if (isCalculated) {
//       const newBarChartDatasets = electionIds.map((electionId) => {
//         const dataValues = [
//           electionResults[electionId]?.[1] || 0,
//           electionResults[electionId]?.[2] || 0,
//           electionResults[electionId]?.[3] || 0,
//         ];

//         return {
//           label: `Election ${electionId}`,
//           data: dataValues,
//           backgroundColor: [
//             'rgba(255, 99, 132, 0.5)',
//             'rgba(54, 162, 235, 0.5)',
//             'rgba(255, 206, 86, 0.5)',
//           ],
//           borderColor: [
//             'rgba(255, 99, 132, 1)',
//             'rgba(54, 162, 235, 1)',
//             'rgba(255, 206, 86, 1)',
//           ],
//           borderWidth: 1,
//         };
//       });
//       setBarChartDatasets(newBarChartDatasets);

//       const barChartData = {
//         labels: ['Candidate 1', 'Candidate 2', 'Candidate 3'],
//         datasets: newBarChartDatasets,
//       };
//       setChartData(barChartData);

//       const newPieChartDatasets = electionIds.map((electionId) => {
//         const dataValues = [
//           electionResults[electionId]?.[1] || 0,
//           electionResults[electionId]?.[2] || 0,
//           electionResults[electionId]?.[3] || 0,
//         ];

//         return {
//           label: `Election ${electionId}`,
//           data: dataValues,
//           backgroundColor: [
//             'rgba(255, 99, 132, 0.5)',
//             'rgba(54, 162, 235, 0.5)',
//             'rgba(255, 206, 86, 0.5)',
//           ],
//           borderColor: [
//             'rgba(255, 99, 132, 1)',
//             'rgba(54, 162, 235, 1)',
//             'rgba(255, 206, 86, 1)',
//           ],
//           borderWidth: 1,
//         };
//       });
//       setPieChartDatasets(newPieChartDatasets);
//     }
//   }, [isCalculated, electionResults, electionIds]);

//   useEffect(() => {
//     if (chartData && barChartDatasets.length > 0) {
//       // Destroy existing bar charts if they exist
//       electionIds.forEach((electionId) => {
//         const ctx = document.getElementById(`myBarChart${electionId}`);
//         Chart.getChart(ctx)?.destroy();
//       });

//       // Create new bar Chart instances for each election
//       electionIds.forEach((electionId) => {
//         const canvas = document.createElement('canvas');
//         canvas.id = `myBarChart${electionId}`;
//         canvas.width = 500;
//         canvas.height = 300;

//         document.getElementById('barChartContainer').appendChild(canvas);

//         const newCtx = document.getElementById(`myBarChart${electionId}`);
//         new Chart(newCtx, {
//           type: 'bar',
//           data: {
//             labels: ['Candidate 1', 'Candidate 2', 'Candidate 3'],
//             datasets: [barChartDatasets.find(dataset => dataset.label === `Election ${electionId}`)],
//           },
//           options: {
//             scales: {
//               y: {
//                 beginAtZero: true,
//               },
//             },
//           },
//         });
//       });
//     }

//     if (pieChartDatasets.length > 0) {
//       // Destroy existing pie charts if they exist
//       electionIds.forEach((electionId) => {
//         const ctx = document.getElementById(`myPieChart${electionId}`);
//         Chart.getChart(ctx)?.destroy();
//       });

//       // Create new pie Chart instances for each election
//       electionIds.forEach((electionId) => {
//         const canvas = document.createElement('canvas');
//         canvas.id = `myPieChart${electionId}`;
//         canvas.width = 500;
//         canvas.height = 300;

//         document.getElementById('pieChartContainer').appendChild(canvas);

//         const newCtx = document.getElementById(`myPieChart${electionId}`);
//         new Chart(newCtx, {
//           type: 'doughnut', // You can use 'pie' for a regular pie chart
//           data: {
//             labels: ['Candidate 1', 'Candidate 2', 'Candidate 3'],
//             datasets: [pieChartDatasets.find(dataset => dataset.label === `Election ${electionId}`)],
//           },
//           options: {
//             responsive: true,
//             plugins: {
//               legend: {
//                 position: 'top',
//               },
//               title: {
//                 display: true,
//                 text: `Election ${electionId} Results`,
//               },
//             },
//           },
//         });
//       });
//     }
//   }, [chartData, barChartDatasets, pieChartDatasets, electionIds]);

//   return (
//     <>
//       <Navbar />
//       <div style={{ margin: '3rem', padding: '3rem' }}>
//         <h2>Bar and Pie Chart Example</h2>
//         <div id="barChartContainer" style={{ margin: '1rem' }}>
//           {/* Bar Charts will be dynamically appended here */}
//         </div>
//         <div id="pieChartContainer" style={{ margin: '1rem' }}>
//           {/* Pie Charts will be dynamically appended here */}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default ResultsPage;


// BAR, PIE, POLAR TRIAL
import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import Navbar from '../Navbar2';
import Footer from '../Footer';
import { sendRequest } from '../utils/ResDbClient';
import { FETCH_TRANSACTION } from '../utils/ResDbApis';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
const ResultsPage = () => {
  const [voterList, setVoterList] = useState([]);
  const [isCalculated, setIsCalculated] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [electionResults, setElectionResults] = useState({});
  const [electionIds, setElectionIds] = useState([]);
  const [barChartDatasets, setBarChartDatasets] = useState([]);
  const [pieChartDatasets, setPieChartDatasets] = useState([]);
  const [polarChartDatasets, setPolarChartDatasets] = useState([]);
  const chartContainerRef = useRef(null);
  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await sendRequest(FETCH_TRANSACTION("B8GFzNi6vfVhA9crXSC2S8s9K2eoNJd1HhwEbCLwT6gC", "B8GFzNi6vfVhA9crXSC2S8s9K2eoNJd1HhwEbCLwT6gC"));

      if (res && res.data && res.data.getFilteredTransactions) {
        let voters = [];
        let updatedResults = {};

        res.data.getFilteredTransactions?.forEach(element => {
          let json = JSON.parse(element.asset.replace(/'/g, '"')).data;
          voters.push(json);

          let candidateId = json["candidateId"];
          let electionId = json["electionId"];

          if (!(electionId in updatedResults)) {
            updatedResults[electionId] = {};
          }

          if (!(candidateId in updatedResults[electionId])) {
            updatedResults[electionId][candidateId] = 0;
          }

          updatedResults[electionId][candidateId]++;
        });

        setVoterList(voters);
        setIsCalculated(true);
        setElectionResults(updatedResults);
        setElectionIds(Object.keys(updatedResults));
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    if (isCalculated) {
      const newBarChartDatasets = electionIds.map((electionId) => {
        const dataValues = [
          electionResults[electionId]?.[1] || 0,
          electionResults[electionId]?.[2] || 0,
          electionResults[electionId]?.[3] || 0,
        ];

        return {
          label: `Election ${electionId}`,
          data: dataValues,
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1,
        };
      });
      setBarChartDatasets(newBarChartDatasets);

      const newPieChartDatasets = electionIds.map((electionId) => {
        const dataValues = [
          electionResults[electionId]?.[1] || 0,
          electionResults[electionId]?.[2] || 0,
          electionResults[electionId]?.[3] || 0,
        ];

        return {
          label: `Election ${electionId}`,
          data: dataValues,
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1,
        };
      });
      setPieChartDatasets(newPieChartDatasets);

      const newPolarChartDatasets = electionIds.map((electionId) => {
        const dataValues = [
          electionResults[electionId]?.[1] || 0,
          electionResults[electionId]?.[2] || 0,
          electionResults[electionId]?.[3] || 0,
        ];

        return {
          label: `Election ${electionId}`,
          data: dataValues,
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1,
        };
      });
      setPolarChartDatasets(newPolarChartDatasets);
    }
  }, [isCalculated, electionResults, electionIds]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // Adjust threshold as needed
    };

    const handleIntersection = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const chartId = entry.target.id;
          const electionId = chartId.split('my')[1];

          const barCtx = document.getElementById(`myBarChart${electionId}`);
          // Create other charts similarly for pie and polar charts

          new Chart(barCtx, {
            type: 'bar',
            data: {
              // ... (your chart data configuration)
            },
            options: {
              // ... (your chart options)
            },
          });

          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    if (chartContainerRef.current) {
      const chartContainers = chartContainerRef.current.querySelectorAll('.chart-container > div');
      chartContainers.forEach((container) => {
        observer.observe(container);
      });
    }

    return () => {
      observer.disconnect();
    };
  }, [electionIds]);

  useEffect(() => {
    if (barChartDatasets.length > 0 && pieChartDatasets.length > 0 && polarChartDatasets.length > 0) {
      document.getElementById('chartContainer').innerHTML = '';

      electionIds.forEach((electionId) => {
        const container = document.createElement('div');
        container.classList.add('chart-container');

        const barCanvas = document.createElement('canvas');
        barCanvas.id = `myBarChart${electionId}`;
        barCanvas.width = 150; // Adjust width as needed
        barCanvas.height = 150; // Adjust height as needed

        const pieCanvas = document.createElement('canvas');
        pieCanvas.id = `myPieChart${electionId}`;
        pieCanvas.width = 150; // Adjust width as needed
        pieCanvas.height = 150; // Adjust height as needed

        const polarCanvas = document.createElement('canvas');
        polarCanvas.id = `myPolarChart${electionId}`;
        polarCanvas.width = 150; // Adjust width as needed
        polarCanvas.height = 150; // Adjust height as needed

        container.appendChild(barCanvas);
        container.appendChild(pieCanvas);
        container.appendChild(polarCanvas);

        document.getElementById('chartContainer').appendChild(container);

        const barCtx = document.getElementById(`myBarChart${electionId}`);
        new Chart(barCtx, {
          type: 'bar',
          data: {
            labels: ['Candidate 1', 'Candidate 2', 'Candidate 3'],
            datasets: [barChartDatasets.find(dataset => dataset.label === `Election ${electionId}`)],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: `Election ${electionId} Bar Chart Results`,
              },
            },
          },
        });

        const pieCtx = document.getElementById(`myPieChart${electionId}`);
        new Chart(pieCtx, {
          type: 'doughnut',
          data: {
            labels: ['Candidate 1', 'Candidate 2', 'Candidate 3'],
            datasets: [pieChartDatasets.find(dataset => dataset.label === `Election ${electionId}`)],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'right',
              },
              title: {
                display: true,
                text: `Election ${electionId} Pie Chart Results`,
              },
            },
          },
        });

        const polarCtx = document.getElementById(`myPolarChart${electionId}`);
        new Chart(polarCtx, {
          type: 'polarArea',
          data: {
            labels: ['Candidate 1', 'Candidate 2', 'Candidate 3'],
            datasets: [polarChartDatasets.find(dataset => dataset.label === `Election ${electionId}`)],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'left',
              },
              title: {
                display: true,
                text: `Election ${electionId} Polar Area Chart Results`,
              },
            },
          },
        });
      });
    }
  }, [barChartDatasets, pieChartDatasets, polarChartDatasets, electionIds]);

  return (
    <>
      <Navbar />
      <Card sx={{ maxWidth: 1200,}}>
      <div style={{ margin: '3rem', padding: '3rem'}}>
        <h2 style={{ marginBottom: '1.5rem' }}>Bar, Pie, and Polar Area Chart</h2>
        <div className="chart-heading" style={{ marginBottom: '2rem' }}>
            {/* Charts will be dynamically appended here */}
          </div>
        <div id="chartContainer" ref={chartContainerRef} style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          {/* Charts will be dynamically appended here */}
        </div>
      </div>
      </Card>
    </>
  );
};

export default ResultsPage;