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
//         label: 'Election A',
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
import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { sendRequest } from '../utils/ResDbClient';
import { FETCH_TRANSACTION } from '../utils/ResDbApis';
import Chart from 'chart.js/auto';
import Navbar from '../Navbar';
import Footer from '../Footer';

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
//   //           label: 'Election A',
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

const ResultsPage = () => {
  const [voterList, setVoterList] = useState([]);
  const [isCalculated, setIsCalculated] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [electionResults, setElectionResults] = useState({});
  const [electionIds, setElectionIds] = useState([]);
  const [datasets, setDatasets] = useState([]);

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
        console.log("Election Results: ", updatedResults);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };


  

  useEffect(() => {
    if (isCalculated) {
      // Create datasets dynamically based on electionResults
      const newDatasets = electionIds.map((electionId, index) => {
        const dataValues = [
          electionResults[electionId]?.[1] || 0,
          electionResults[electionId]?.[2] || 0,
          electionResults[electionId]?.[3] || 0,
        ];

        return {
          label: `Election ${electionId}`,
          data: dataValues,
          // backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`,
          // borderColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`,
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
      setDatasets(newDatasets);

      const data = {
        labels: ['Candidate 1', 'Candidate 2', 'Candidate 3'],
        datasets: newDatasets,
      };

      setChartData(data);
    }
  }, [isCalculated, electionResults, electionIds]);

  useEffect(() => {
    if (chartData && datasets.length > 0) {
      // Destroy existing charts if they exist
      electionIds.forEach((electionId) => {
        const ctx = document.getElementById(`myBarChart${electionId}`);
        Chart.getChart(ctx)?.destroy();
      });

      // Create a new Chart instance for each election
      electionIds.forEach((electionId, index) => {
        const canvas = document.createElement('canvas');
        canvas.id = `myBarChart${electionId}`;
        canvas.width = 500;
        canvas.height = 300;

        document.getElementById('chartContainer').appendChild(canvas);

        const newCtx = document.getElementById(`myBarChart${electionId}`);
        new Chart(newCtx, {
          type: 'bar',
          data: {
            labels: ['Candidate 1', 'Candidate 2', 'Candidate 3'],
            datasets: [datasets[index]],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      });
    }
  }, [chartData, electionIds, datasets]);

return (
  <>
    <Navbar />
    <div style={{margin: '3rem', padding: '3rem' }}>
      <h2>Bar Chart Example</h2>
      <div id="chartContainer" style={{ margin: '1rem',display: 'flex', flexDirection: 'column' }}>
        {/* Charts will be dynamically appended here */}
      </div>
    </div>
    <Footer />
  </>
);

};

export default ResultsPage;
