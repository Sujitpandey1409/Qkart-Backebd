const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");

let server;

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Create Mongo connection and get the express app to listen on config.port
console.log(config.mongoose.url)
const dbConnect = async()=>{try {
    await mongoose.connect(config.mongoose.url)
    console.log("connected to mongodb");
} catch (error) {
    console.log("error connecting mongodb",error);
}}
dbConnect();
const  PORT = config.port||8082
app.listen(PORT,()=>console.log(`Listening on port:${PORT}`))
