import { Chart } from "chart.js";
import { useEffect, useRef } from "react";
import "chart.js/auto";
import 'chartjs-adapter-date-fns';

// Helper function to display thousands in K format
const formatThousands = (value: string | number) => Intl.NumberFormat('en-US', {
  maximumSignificantDigits: 3,
  notation: 'compact',
}).format(typeof value === "number" ? value : parseInt(value));

// Define Chart.js default settings
Chart.defaults.font.family = '"Inter", sans-serif';
Chart.defaults.font.weight = '500';
Chart.defaults.color = 'rgb(148, 163, 184)';
Chart.defaults.scale.grid.color = 'rgb(241, 245, 249)';
Chart.defaults.plugins.tooltip.titleColor = 'rgb(30, 41, 59)';
Chart.defaults.plugins.tooltip.bodyColor = 'rgb(30, 41, 59)';
Chart.defaults.plugins.tooltip.backgroundColor = '#FFF';
Chart.defaults.plugins.tooltip.borderWidth = 1;
Chart.defaults.plugins.tooltip.borderColor = 'rgb(226, 232, 240)';
Chart.defaults.plugins.tooltip.displayColors = false;
Chart.defaults.plugins.tooltip.mode = 'nearest';
Chart.defaults.plugins.tooltip.intersect = false;
Chart.defaults.plugins.tooltip.position = 'nearest';
Chart.defaults.plugins.tooltip.caretSize = 0;
Chart.defaults.plugins.tooltip.caretPadding = 20;
Chart.defaults.plugins.tooltip.cornerRadius = 4;
Chart.defaults.plugins.tooltip.padding = 8;

function App() {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (chartIdRef.current !== null) {
      return;
    }

    if (chartRef.current === null) {
      return;
    }

    const chart = new Chart(chartRef.current, {
      type: 'line',
      data: {
        labels: [
          '12-01-2020', '01-01-2021', '02-01-2021',
          '03-01-2021', '04-01-2021', '05-01-2021',
          '06-01-2021', '07-01-2021', '08-01-2021',
          '09-01-2021', '10-01-2021', '11-01-2021',
          '12-01-2021', '01-01-2022', '02-01-2022',
          '03-01-2022', '04-01-2022', '05-01-2022',
          '06-01-2022', '07-01-2022', '08-01-2022',
          '09-01-2022', '10-01-2022', '11-01-2022',
          '12-01-2022', '01-01-2023',
        ],
        datasets: [
          // Indigo line
          {
            label: 'Current',
            data: [
              5000, 8700, 7500, 12000, 11000, 9500, 10500,
              10000, 15000, 9000, 10000, 7000, 22000, 7200,
              9800, 9000, 10000, 8000, 15000, 12000, 11000,
              13000, 11000, 15000, 17000, 18000,
            ],
            fill: true,
            backgroundColor: 'rgba(59, 130, 246, 0.08)',
            borderColor: 'rgb(99, 102, 241)',
            borderWidth: 2,
            tension: 0,
            pointRadius: 0,
            pointHoverRadius: 3,
            pointBackgroundColor: 'rgb(99, 102, 241)',
          },
          // Gray line
          {
            label: 'Previous',
            data: [
              8000, 5000, 6500, 5000, 6500, 12000, 8000,
              9000, 8000, 8000, 12500, 10000, 10000, 12000,
              11000, 16000, 12000, 10000, 10000, 14000, 9000,
              10000, 15000, 12500, 14000, 11000,
            ],
            borderColor: 'rgb(203, 213, 225)',
            fill: false,
            borderWidth: 2,
            tension: 0,
            pointRadius: 0,
            pointHoverRadius: 3,
            pointBackgroundColor: 'rgb(203, 213, 225)',
          },
        ],
      },
      options: {
        layout: {
          padding: 20,
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => formatThousands(value),
            },
          },
          x: {
            type: 'time',
            time: {
              parser: 'MM-dd-yyyy',
              unit: 'month',
              displayFormats: {
                month: 'MMM yy',
              },
            },
            grid: {
              display: false,
            },
            ticks: {
              autoSkipPadding: 48,
              maxRotation: 0,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: (context) => formatThousands(context.parsed.y),
            },
          },
        },
        interaction: {
          intersect: false,
          mode: 'nearest',
        },
        maintainAspectRatio: false,
      },
    });
    chartIdRef.current = chart.id;
  }, []);

  return (
    <>
      <canvas ref={chartRef} id="analytics-card" width="800" height="300"></canvas>
    </>
  );
}

export default App
