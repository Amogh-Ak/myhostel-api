require("dotenv").config({ path: "./config.env" });

const express = require("express");
const http = require("http");
const connectDB = require("./server-utils/connectDB");

const app = express();
app.use(express.json());
const server = http.Server(app);
const cors = require("cors");

connectDB();

app.get("/", (req, res) => {
    res.send("Hello, Welcome to My-Hostel api");
  });
  
var corsOptions = {
    origin: process.env.FE_NEXT_API_URL,
    optionsSuccessStatus: 200,
    methods: "GET, PUT, DELETE, POST, PATCH, HEAD, OPTIONS",
};

app.use(cors(corsOptions));
app.use("/api/facilities", require("./api/facilities"));
app.use("/api/signup",require("./api/signup"))
app.use("/api/auth",require("./api/auth"))
app.use("/api/hosteldetails",require("./api/hosteldetails"))
app.use("/api/rooms",require("./api/rooms"))
app.use("/api/hostel",require("./api/hostel"))
app.use("/api/all",require("./api/all"))
app.use("/api/user",require("./api/user"))

server.listen(process.env.PORT || 8383, (err) => {
    if (err) throw err;
    console.log(`Express server running on port ${process.env.PORT}`);
});  