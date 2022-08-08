const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDbs = require('./config/database');
require('colors')

//use env
dotenv.config();

//connction for Mongodb
connectDbs();


app.listen(process.env.SERVER_PORT, () => {
   console.log(`server running on ${process.env.SERVER_PORT}`.bgYellow.white);

})