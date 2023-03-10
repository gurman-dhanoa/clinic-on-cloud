const app = require("./app");
const connectDatabse = require("./config/database");
const dotenv = require("dotenv");

// Handling uncaught exception
process.on("uncaughtException",(err)=>{
    console.log(`Error : ${err.message}`);
    console.log("Shutting down the server due to uncaught exception");

    server.close(()=>{
        process.exit(1);
    });
})

dotenv.config({path:"config/config.env"});

connectDatabse();

const server = app.listen(process.env.PORT, ()=>{
    console.log(`App is running on http://localhost/${process.env.PORT}`)
});

// Unhandled promise rejection
process.on("unhandledRejection",(err)=>{
    console.log(`Error : ${err.message}`);
    console.log("Shutting down the server due to unhandled promise rejection");

    server.close(()=>{
        process.exit(1);
    });
});