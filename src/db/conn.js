const mongoose = require("mongoose");

// connect to mongodb
//mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URL, {
}).then(() => {
    console.log("Connected Successfully")
}).catch((e) => {
    console.log("error in connection : ", e)
})