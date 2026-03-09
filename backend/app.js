const express = require('express');
const authRoutes = require('./routes/auth.routes');
const errorHandler = require('./middleware/error.middleware');
const cors = require("cors");
const app = express();


// middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// routes
app.use('/auth', authRoutes)


app.use(errorHandler);

module.exports = app;