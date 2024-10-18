const express = require("express");
const app = express();
const port = 3000;
const connectDB = require("./connection");
const router = require("./routes/route");

//middleware ...
app.use(express.json());

//..mongoose Database....
connectDB();

//...routes calling..
app.use("/", router);

app.get("/", (req, res) => {
  res.send("Hello world");
});

//...server is calling
app.listen(port, () => {
  console.log("Server is running on this on ", port);
});
