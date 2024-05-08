const mongoose = require("mongoose");
const mongoURI = "mongodb+srv://elvishbaba282:billa.raj@news-note.qbmegol.mongodb.net/?retryWrites=true&w=majority&appName=news-note"


const connectToMongo = () => {
  mongoose.connect(mongoURI, {

  }).then(()=>{

    console.log("CONNECTED TO MONGO");
  })
 .catch(()=>{
    console.log("SOMEthing ERror")
  })
}


module.exports = connectToMongo;
