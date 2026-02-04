import { MongoClient } from 'mongodb';
import { readFileSync } from 'fs';
import { join } from 'path';

// Manual .env parser since dotenv is missing
function loadEnv() {
  try {
    const content = readFileSync(join(process.cwd(), '.env.local'), 'utf8');
    content.split('\n').forEach(line => {
      const match = line.match(/^([^=]+)=(.*)$/);
      if (match) {
        process.env[match[1].trim()] = match[2].trim().replace(/^["']|["']$/g, '');
      }
    });
  } catch (e) {
    console.error("Could not read .env.local", e.message);
  }
}

loadEnv();

const uri = process.env.MONGODB_URI;

if (!uri) {
    console.error("MONGODB_URI is not defined in .env.local");
    process.exit(1);
}

const client = new MongoClient(uri);

async function createIndexes() {
  try {
    await client.connect();
    const db = client.db("velvetbrew");
    console.log("Connected to database...");

    // Products Indexes
    console.log("Creating indexes for Products...");
    await db.collection("products").createIndex({ category: 1 });
    await db.collection("products").createIndex({ price: 1 });
    await db.collection("products").createIndex({ featured: 1 });
    try {
        await db.collection("products").createIndex({ id: 1 }, { unique: true }); 
    } catch (e) { console.log("id index logic error", e.message); }

    // Orders Indexes
    console.log("Creating indexes for Orders...");
    await db.collection("orders").createIndex({ userEmail: 1 });
    await db.collection("orders").createIndex({ createdAt: -1 });

    console.log("All indexes created successfully!");
  } catch (err) {
    console.error("Error creating indexes:", err);
  } finally {
    await client.close();
  }
}

createIndexes();
