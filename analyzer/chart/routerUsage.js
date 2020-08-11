const usageData = {};
setInterval(() => {
  requestData.unshift(0);
  requestData.pop();
}, 5000);

module.exports = {
  publish: (data) => {
    requestData[0]++;
  },
  name: 'routerUsage',
  getChartData: () => {
      return {
        type: 'line',
        data: {
          labels: ['05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '60'],
          datasets: [{
            label: '5분 당 라우터 사용량',
            data: requestData,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            fill: false
          }]
        },

        options: {
          maintainAspectRatio: true, // default value. false일 경우 포함된 div의 크기에 맞춰서 그려짐.
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero:true,
                precision: 0
              }
            }]
          }
        }
      }
  }
}