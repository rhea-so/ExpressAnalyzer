console.log('Analyzer started');

// #region Variables init
const rawData = [];
const observer = [];
// #endregion

// #region Chart Load
observer.push(require('./chart/requestCounter'));
observer.push(require('./chart/delayCounter'));
observer.push(require('./chart/routerUsage'));
// #endregion

// #region Make Response Data
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
    html += `<canvas id="${item.name}"></canvas><br/>\n`;
  }
  
  return html;
}
// #endregion

// #region HTML Response
module.exports = function () { 
  return (req, res, next) => {
    try {
      if (req.url === '/analyzer') {
        res.contentType('text/html');
        res.send(`
            <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
            <div style="width:500px">
              ${canvas()}
            </div>
            <script>
             ${scripts()}
            </script>
        `);
        return;
      }
     
      const startTime = Date.now();      
      res.on('finish', () => {
          for(const item of observer) {
            item.publish({
              date : Date.now(),
              time : Date.now() - startTime,
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
// #endregion