import { MongoClient } from "mongodb";
import { createLogger } from "vite";

const connectionString = process.env.ATLAS_URI || "";
console.log(connectionString);

// MongoDB client with connection URI
const client = new MongoClient(connectionString);

let conn;

// Attempt to connect to the client (MongoDB)
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

// Define which DB we are connecting to
let db = conn.db("sample_training");

export default db;