const mongoose = require("mongoose");
const uri = "mongodb+srv://suleiman:hellodb@cluster0.si6r4lg.mongodb.net/";


function main() {
    mongoose.connect(uri).then(() => {
        console.log("Succesfull")
    
    }).catch((err) => {
        console.log("Error: ", err)
    })
}

module.exports = { main };