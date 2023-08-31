import Chart from 'chart.js/auto';

const createChart = (scale, canvas, type, labels, datasets, title, providedDelay) => {
  if (!canvas || !canvas.getContext) {
    console.error('Invalid canvas element');
    return;
  }

  if (canvas.chart) {
    canvas.chart.destroy();
  }

  canvas.chart = new Chart(canvas.getContext('2d'), {
    type: type,
    data: {
      labels: labels,
      datasets: datasets
    },
    options: {
      animation: {
        delay: (context) => {
            let delay = 0;
            if (context.type === 'data') {
                delay = context.dataIndex * providedDelay + context.datasetIndex * (providedDelay / 3);
            }
            return delay;
        },
      },
      scales: {
        y: {
          stacked: true,
          type: scale,
          beginAtZero: true,
          ticks: {
            color: '#666'
          }
        },
        x: {
          stacked: true,
          ticks: {
            color: '#666'
          }
        }
      },
      plugins: {
        title: {
          display: true,
          text: title,
          font: {
            size: 18,
            weight: 'bold'
          }
        }
      },
    }
  });
};

const createChart1 = (canvasRef, Information, delay) => {
  if (Information && canvasRef.current) {
    const labels = [
      'Total Cases',
      'Total Testing',
      'Hospitalized Currently',
      'In ICU Currently',
      'On Ventilator Currently',
      'Total Deaths'
    ];

    const datasets = [
      {
        label: 'COVID-19 Scales', // Change as needed
        data: [
          Information.total_cases,
          Information.total_testing,
          Information.hospitalized_currently,
          Information.in_icu_currently,
          Information.on_ventilator_currently,
          Information.total_deaths
        ],
        backgroundColor: 'rgba(54, 162, 235, 0.4)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }
    ];

    createChart(
      'logarithmic',
      canvasRef.current,
      'bar',
      labels,
      datasets,
      'COVID-19 Statistics',
      delay
    );
  }
};

const createChart2 = (canvasRef1, canvasRef2, canvasRef3, labels, totalCasesData, totalTestingData, totalDeathsData, totalHospitalizeCurrently, inIcuCurrentlyData, onVentilatorCurrentlyData, delay) => {
  const datasetsCanvas1 = [
    {
      label: 'Total Cases',
      data: totalCasesData,
      backgroundColor: 'rgba(54, 162, 235, 0.4)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    },
    {
      label: 'Total Testing',
      data: totalTestingData,
      backgroundColor: 'rgba(120, 99, 132, 0.4)',
      borderColor: 'rgba(120, 99, 132, 1)',
      borderWidth: 1
    }
  ];

  const datasetsCanvas2 = [
    {
      label: 'Total Deaths',
      data: totalDeathsData,
      backgroundColor: 'rgba(54, 162, 235, 0.4)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    },
    {
      label: 'Hospitalized Currently',
      data: totalHospitalizeCurrently,
      backgroundColor: 'rgba(120, 99, 132, 0.4)',
      borderColor: 'rgba(120, 99, 132, 1)',
      borderWidth: 1
    }
  ];

  const allNullInIcu = inIcuCurrentlyData.every((value) => value === null);
  const allNullOnVentilator = onVentilatorCurrentlyData.every((value) => value === null);

  const datasetsCanvas3 = [
    {
      label: allNullInIcu ? 'No registered data' : 'In ICU Currently',
      data: allNullInIcu ? [] : inIcuCurrentlyData,
      backgroundColor: 'rgba(54, 162, 235, 0.4)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    },
    {
      label: allNullOnVentilator ? 'No registered data' : 'On Ventilator Currently',
      data: allNullOnVentilator ? [] : onVentilatorCurrentlyData,
      backgroundColor: 'rgba(120, 99, 132, 0.4)',
      borderColor: 'rgba(120, 99, 132, 1)',
      borderWidth: 1
    }
  ];

  if (canvasRef1 && canvasRef1.current) {
    createChart('linear', canvasRef1.current, 'bar', labels, datasetsCanvas1, 'Total Cases and Total Deaths', delay);
  }

  if (canvasRef2 && canvasRef2.current) {
    createChart('linear', canvasRef2.current, 'line', labels, datasetsCanvas2, 'Total Deaths and Total Hospitalized Currently', delay);
  }

  if (canvasRef3 && canvasRef3.current) {
    createChart('linear', canvasRef3.current, 'bar', labels, datasetsCanvas3, 'In ICU Currently and On Ventilator Currently', delay);
  }
};

export { createChart, createChart1, createChart2 };
