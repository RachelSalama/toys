const express = require("express");
const cors = require("cors");
const toyRoutes = require("./routes/toy.routes");
const userRoutes = require("./routes/user.routes");
const path  = require("path");

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/toys", toyRoutes);
app.use("/api/v1/users", userRoutes);

app.get("/test", (req, res) =>{
    res.json({msg: "hi"});
});

//global error handler
app.use((error, req, res, next) =>{
    console.log(error);
    return res.status(400).send({msg: error.message})//=>msg: "Something went wrong"
});


// app.all('*', (req,res,next)=>{
//     next(new AppError(404, "This requested resource not exist on server"))
// // })




module.exports.app = app;