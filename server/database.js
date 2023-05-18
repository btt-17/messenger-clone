const { MongoClient } = require("mongodb");
const url = process.env.MONGODB_URL; 
const dbName = process.env.MONGODB_DB; 

let dbConnection;

async function connectToServer() {
    try { 
        const client = new MongoClient(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,    
        });

        console.log("connecting to MongoDB Atlas cluster...");

        const db = await client.connect() 
        console.log("Successfully connected to MongoDB Atlas!");

        dbConnection = db.db(dbName);
    } catch (error) { 
        console.log(error)
    }
}

function getDb() {
    return dbConnection;
}



module.exports = {
    connectToServer,
    getDb
}