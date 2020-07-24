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
  
  // Export
  return (req, res, next) => {
    if (req.url === '/analyzer') {
      res.send('analyzer');
      return;
    }
    const startTime = Date.now();
    res.on('finish', () => {
      console.log(`${req.url} : ${Date.now() - startTime}ms`);
    });
    next();
    return;
  }
}