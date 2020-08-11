module.exports = {
  publish: (data) => {
    
  },
  name: 'delayCounter',
  getChartData: () => {
      return {
        type: 'horizontalBar',
        data: {
          labels: ['05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '60'],
          datasets: [{
            label: '5분 당 총 요청 수',
            data: [1,2,3,4]
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