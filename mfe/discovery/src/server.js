const express = require('express');
const path = require('path');
const app = express();
const indexRouter = require('./routes/index');

app.use((req, res, next) => {
  
  // res.header('Cache-Control', 'no-cache');
  // res.header('Pragma', 'no-cache');
  // res.header('Expires', '0');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Timing-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/', indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;