const express = require('express');
const app = express();

app.use(analyzer());

let i = 0;
app.get('/', (req, res) => {
  res.send(`Hello, World! at ${i++}`);
})

app.listen(process.env.PORT || 3000, () => console.log('start at', new Date()));



function analyzer() {
  // Variables init
  const rawData = [];
  
  // Export
  return (req, res, next) => {
    try {
      if (req.url === '/analyzer') {
       let html = `
         <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
         <div style="width:800px">
            <canvas id="myChart"></canvas>
        </div>
        
        <script>
        // 우선 컨텍스트를 가져옵니다. 
        var ctx = document.getElementById("myChart").getContext('2d');
        /*
        - Chart를 생성하면서, 
        - ctx를 첫번째 argument로 넘겨주고, 
        - 두번째 argument로 그림을 그릴때 필요한 요소들을 모두 넘겨줍니다. 
        */
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
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
        });
        </script>
       `;
        
        res.contentType('text/html');
        res.send(html);
        return;
      }
      
      const startTime = Date.now();
      res.on('finish', () => {
        rawData[req.url].push({
          date : Date.now(),
          time : Date.now() - startTime,
          url : req.url,
          method : req.method,
          ip : req.headers['x-forwarded-for'] || req.connection.remoteAddress
        });
      });
      next();
    } catch (error) {
      console.log(error);
      next();
    }
  }
}