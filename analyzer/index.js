console.log('Express Analyzer started');

const observer = [
  require('./chart/requestCounter'),
  require('./chart/delayCounter'),
//  require('./chart/routerUsage')
];

function scripts() {
  let html = '';
  for (const item of observer) {
      html += `new Chart(document.getElementById('${item.name}').getContext('2d'), ${JSON.stringify(item.getChartData())})\n`;
  }
  
  return html;
}

function canvas() {
  let html = '';
  for (const item of observer) {
    html += `
    <div class="card">
        <canvas id="${item.name}">
        </canvas>
    </div>
    <br/>`;
  }
  
  return html;
}

module.exports = function () { 
  return (req, res, next) => {
    try {
      // Want to watch Analyzer site
      if (req.url === '/analyzer') {
        res.contentType('text/html');
        res.send(`
            <html>            
            <head>
                <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
                <style type="text/css">
                    @import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);
                    * {
                      font-family: 'Nanum Gothic', sans-serif;
                    }
                    html, body {
                      height: 100%;
                      background-color: #eee;
                    }
                    
                    .card {
                        box-sizing: border-box;
                        min-width: 200px;
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 10px;
                        background-color: white;
                        border: 1px solid #aaa;
                    }
                    
                    .footer {
                        font-size: 10px;
                        text-align: center;
                    }
                </style>
            </head>
            
            <body>
              ${canvas()}
            <div class="footer">
                Developed by JeongHyeon Kim
              </div>
            </body>

            <script>
             ${scripts()}
          </script>
            </html>
        `);
        return;
      }
     
     // Other case
      const startTime = Date.now();      
      res.on('finish', () => {
          for(const item of observer) {
            item.publish({
              date : Date.now(),
              delay : Date.now() - startTime,
              url : req.url,
              method : req. method,
              ip : req.headers['x-forwarded-for'] || req.connection.remoteAddress
            });
          }
      });
      next();
    } catch (error) {
      console.log(error);
      next();
    }
  }
}