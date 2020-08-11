const requestData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
setInterval(() => {
  requestData.unshift(0);
  requestData.pop();
}, 5000);

module.exports = {
  publish: (data) => {
    if (requestData[0] < data.delay) {
        requestData[0] = data.delay;
    }
  },
  name: 'delayCounter',
  getChartData: () => {
      return {
        type: 'horizontalBar',
        data: {
          labels: ['05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '60'],
          datasets: [{
            label: '5분 당 최대 딜레이 (ms)',
            data: requestData
          }]
        },

        options: {
          maintainAspectRatio: true, // default value. false일 경우 포함된 div의 크기에 맞춰서 그려짐.
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero:true
              }
            }]
          }
        }
      }
  }
}