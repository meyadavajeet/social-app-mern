const mongoose = require('mongoose');


const connectDbs = async () =>{
    try {
        const url = process.env.MONGO_ATLAS_URL
        const conn = await mongoose.connect(url,{
            // useCreateIndex: true,
            // useUnifiedTopology: true,
            // useNewUrlParser: true,
            // useFindAndModify: false,
        });
        console.log(`Mongodb Database Connected!${conn.connection.host}`.bgGreen.white);
    } catch (error) {
        console.error(`error${error.message}`.bgRed.white);
    }
}

module.exports = connectDbs;
