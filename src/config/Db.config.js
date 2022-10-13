const mongoose = require("mongoose")
exports.db = () => {

    mongoose.connect("mongodb://localhost:27017/stripe")
        .then(() => {
            console.log(`Database connected`);
        })
        .catch((error) => {
            console.log(error);
        })
}
