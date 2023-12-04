const mongoose =require("mongoose");
const { app } = require("./app");
const dotenv = require("dotenv");



// read from enviorment varialble
dotenv.config();//=> {path: "./.env"}
const mongoURL = process.env.MONGO_URL


//connect to database
const connectToDB = () =>{
mongoose.connect(mongoURL)
.then((con)=>{
    console.log(`conected to database: ${mongoURL}`);
})
.catch((error)=>{
    log.error("Error to connect to database");
    log.error(error);
})
};
connectToDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`the server is running on port ${PORT}`);
})