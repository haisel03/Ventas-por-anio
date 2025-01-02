const ctx = document.getElementById('Graf1').getContext('2d');
const cty = document.getElementById('Graf2').getContext('2d');
let grafBar;
let grafLine;

// Generar el gráfico
function generateChart(data) {
  const labels = data.map(item => item.month);
  const values = data.map(item => item.sales);

  if (grafBar) {
    grafBar.destroy();
  }
  if (grafLine) {
    grafLine.destroy();
  }
  grafBar = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Ventas por Mes',
        data: values,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top',
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  grafLine = new Chart(cty, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Ventas por Mes',
        data: values,
        borderColor: 'rgba(75, 192, 192, 1)',
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        pointBorderColor: 'rgba(75, 192, 192, 1)',
        pointBorderWidth: 1,
      }]
    }
  });
}

// Oobtener datos desde el JSON
async function fetchSalesData(anio) {
  const response = await fetch('ventas.json');
  const data = await response.json();
  return data[anio] || [];
}

// Manejo del formulario
document.getElementById('frmVentas').addEventListener('submit', async (event) => {
  event.preventDefault();
  const anio = document.getElementById('year').value;
  const datos = await fetchSalesData(anio);
  generateChart(datos);
});
