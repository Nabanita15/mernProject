const express = require('express');
const app = express();
const port = 3000;
const connectDB = require('./connection');

//middleware ...
app.use(express.json());

//..mongoose Database....
connectDB();

app.get("/", (req, res) => {
    res.send("Hello world");
})

//...server is calling
app.listen(port, () => {
    console.log("Server is running on this on ",port);
})