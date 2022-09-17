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
const postRoute = require('./routes/posts');
const conversationRoute = require('./routes/conversations');
const messageRoute = require('./routes/messages');

// const swaggerJsdoc = require('swagger-jsdoc');
// const swaggerUi = require('swagger-jsdoc-ui');


// /*
//  * swaggger configuration
//  */

// const swaggerOptions = {
//    failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
//    swaggerDefinition: {
//       openapi: '1.0.0',
//       info: {
//          title: 'Quick Post',
//          description:"Quick Post Application Apis list",
//          version: '1.0.0',
//          contact: {
//             name:"Ajeet Yadav",
//          },
//          server: [`http://localhost:${process.env.SERVER_PORT}`]
//       },
//    },
//    apis: ['./routes*.js'],
// };

// const swaggerDocs = swaggerJsdoc(swaggerOptions);
// api.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocs));

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

//post routes
app.use("/api/v1/posts", postRoute);

//conversation routes
app.use("/api/v1/conversations", conversationRoute);

//messages routes
app.use("/api/v1/messages", messageRoute);

/**
*============================================================================
*  api section end
*============================================================================
*/
