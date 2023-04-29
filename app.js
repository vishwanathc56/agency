const express = require("express");
require('dotenv').config({})
// set up our express app
const app = express();

//parser
app.use(express.json());

//db conncet
require("./src/db/conn");

const port = process.env.PORT || 5000;
// initialize routes
app.use('/api', require('./src/router/api'));

app.get("/", async (req, res) => {
    res.send("Response from new node srever for agency")
})
// error handling middleware
app.use(function (err, req, res, next) {
    //console.log(err);
    res.status(422).send({ error: err.message });
});


// listen for requests
app.listen(port, () => {
    console.log(`listening at PORT ${port}`);
})