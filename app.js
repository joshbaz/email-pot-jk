const express = require("express");
const app = express();

const cors = require("cors");

//import routes
const emailRoutes = require("./routes/send");

//apllications of the plugins to the express application
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Give access to the links
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, Accept, Authorization, A-Requested-Width"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "POST");
    return res.status(200).json({});
  }
  next();
});

//use routes
app.use("/send", emailRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Successfully running");
});
