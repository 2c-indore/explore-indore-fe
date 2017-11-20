const express = require('express');

const app = express();

// console.log("My name is")
app.use(express.static(`${__dirname}/public/`));

app.listen(process.env.PORT || 8080);
