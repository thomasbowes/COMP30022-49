const dotenv = require('dotenv')
dotenv.config()

const mongoose = require("mongoose")

// if the app is running on heroku
if (process.env.PORT) {  // are we running on Heroku?
    // login details retrieved from environment variables
    connectionString = "mongodb+srv://<username>:<password>@cluster0.gxwjq.mongodb.net/CRM?retryWrites=true&w=majority"
    
    dbAddress = connectionString.replace("<username>", process.env.MONGO_USERNAME).replace("<password>",process.env.MONGO_PASSWORD)
} else {  // we are running locally
    dbAddress = "mongodb://localhost"
}

// connect to mongodb database
mongoose.connect( dbAddress, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    dbName: "CRM"
})

// connect to the database
const db = mongoose.connection

db.on("error", (err) => {
    console.error(err);
    process.exit(1)
})

db.once("open", async () => {
    console.log("Mongo connection started on " + db.host + ":" + db.port)
})
  
// obtain the database schemas
require("./connection_test_schema") 
