import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { sendRequest } from '../utils/ResDbClient';
import { FETCH_TRANSACTION } from '../utils/ResDbApis';
const ResultsPage = () => {
  const [voterList, setVoterList] = useState([]);
  const [isCalculated, setIsCalculated] = useState(false);
  let electionResults = {};
  useEffect(() => {
      fetchTransactions();
  }, []);
  const fetchTransactions = async (electionId) => {
    
    try {
      // Fetch transactions using the FETCH_TRANSACTION API
      const res = await sendRequest(FETCH_TRANSACTION("B8GFzNi6vfVhA9crXSC2S8s9K2eoNJd1HhwEbCLwT6gC", "B8GFzNi6vfVhA9crXSC2S8s9K2eoNJd1HhwEbCLwT6gC"));
    
      console.log("Fetch Transactions Response:", res); // Log the response
      
      if (res && res.data && res.data.getFilteredTransactions) {
        // Process the transaction data as needed
        console.log("Fetched Transactions:", res.data.getFilteredTransactions); // Log the fetched transactions
        let voters = [...voterList];
        res.data.getFilteredTransactions?.forEach(element => {
          let json = JSON.parse(element.asset.replace(/'/g, '"')).data;
          voters.push(json);

          let candidateId = json["candidateId"];
          let electionId = json["electionId"];
          
           // Check if electionId exists in electionResults
          if (!(electionId in electionResults)) {
            electionResults[electionId] = {};
          }

          // Check if candidateId exists in electionResults[electionId]
          if (!(candidateId in electionResults[electionId])) {
            electionResults[electionId][candidateId] = 0;
          }

          // Increment the count for the specific candidateId and electionId
          electionResults[electionId][candidateId]++;
          
          
          console.log(electionId, candidateId, electionResults[electionId][candidateId]);
          

          // electionResults[json["electionId"]][candidate]++;
         
        });
        setVoterList(voters);
        setIsCalculated(true);
        console.log(electionResults)  // Use Election Results to display the graph
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      // Handle error scenarios here
    }
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    // Load the Excel file
    const fetchData = async () => {
      const file = '/components/example1.xlsx'; // Update the path to your Excel file
      const response = await fetch(file);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onload = () => {
        const data = new Uint8Array(reader.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0]; // Assuming data is in the first sheet
        const worksheet = workbook.Sheets[sheetName];
        const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        setData(excelData);
      };
      reader.readAsArrayBuffer(blob);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Excel Data</h1>
      <table style={{ borderCollapse: 'collapse', border: '2px solid black', width: '100%' }}>
        <thead>
          <tr>
            {data.length > 0 &&
              data[0].map((header, index) => (
                <th key={index} style={{ border: '2px solid black', padding: '8px' }}>{header}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 1 &&
            data.slice(1).map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} style={{ border: '2px solid black', padding: '8px' }}>{cell}</td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsPage;