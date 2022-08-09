const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDbs = require('./config/database');
require('colors')
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');

/**
 * use env
 */
dotenv.config();

/**
 * database connection
 */
connectDbs();

/**
 * middleware
 */
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));


app.listen(process.env.SERVER_PORT, () => {
   console.log(`server running on ${process.env.SERVER_PORT}`.bgYellow.white);
});

/**
 *============================================================================
 *  api section start
 *============================================================================
 */
//user routes
app.use("/api/v1/users", userRoute);

//auth routes
app.use("/api/v1/auth", authRoute);

/**
*============================================================================
*  api section end
*============================================================================
*/
