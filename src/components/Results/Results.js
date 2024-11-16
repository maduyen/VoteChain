// BAR, PIE, POLAR TRIAL
import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import Navbar from '../Navbar2';
import Footer from '../Footer2';
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
      const res = await sendRequest(FETCH_TRANSACTION("B8GFzNi6vfVhA9crXSC2S8s9K2eoNJd1HhwEbCLwT6gD", "B8GFzNi6vfVhA9crXSC2S8s9K2eoNJd1HhwEbCLwT6gD"));

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
      <Footer />
    </>
  );
};

export default ResultsPage;