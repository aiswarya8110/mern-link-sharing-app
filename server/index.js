require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user");
const linksRouter = require("./routes/links");
const cors = require("cors");
require('./db');
require("./cloudinaryConfig");
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
const PORT = 3000;

app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

app.use('/api/auth', userRouter)
app.use('/api/links', linksRouter);

// For any route path other than /api..
app.get('*', (_, res)=>{
    return res.sendFile(path.join(__dirname,'..', 'client', 'dist', 'index.html'));
})

app.listen(PORT, ()=> console.log("server running on "+ PORT));