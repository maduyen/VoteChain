import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

const ResultsPage = () => {
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