// modules init
const express = require('express');
const analyzer = require('./analyzer');
const app = express();

// middleware added
app.use(analyzer());

let i = 0;
app.get('*', (req, res) => {
  res.send(`Hello, World! at ${i++}`);
})

app.listen(process.env.PORT || 3000, () => console.log('start at', new Date()));