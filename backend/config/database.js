const mongoose = require('mongoose');


const connectDbs = async () => {
    try {
        const url = process.env.MONGO_ATLAS_URL
        const conn = await mongoose.connect(url, { useNewUrlParser: true }, () => {
            console.log(`Mongodb Database Connected!${ process.env.SERVER_PORT}`.bgGreen.white);
        });
    } catch (error) {
        console.error(`error${error.message}`.bgRed.white);
    }
}

module.exports = connectDbs;
