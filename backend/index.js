const express = require("express");
const app = express();
const port = 3000;
const connectDB = require("./connection");
const router = require("./routes/route");
var cookieParser = require("cookie-parser");
const categoryRoute = require("./routes/categoryRoute");
const productRoute = require("./routes/productRoute");

//middleware ...
app.use(express.json());
//cookie...
app.use(cookieParser());

//..mongoose Database....
connectDB();

//...routes calling..
app.use("/", router);
app.use("/api", categoryRoute);
app.use("/product", productRoute);

app.get("/", (req, res) => {
  res.send("Hello world");
});

//...server is calling
app.listen(port, () => {
  console.log("Server is running on this on ", port);
});
