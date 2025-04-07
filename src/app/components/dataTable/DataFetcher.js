'use server'

import DataTable from  "./DataTable"
import { MongoClient } from 'mongodb';


const uri = process.env.MONGODB_URI; 

const dbName = 'astronauts-college';
const collectionName = 'all-rookie-guide-years';

let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    const client = new MongoClient(process.env.MONGODB_URI);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  const client = new MongoClient(process.env.MONGODB_URI);
  clientPromise = client.connect();
}

export default async function DataFetcher() {
    let data = [];
    let data3 = [];

    

    try {
        const client = await clientPromise;
        const database = client.db(dbName);
        const collection = database.collection(collectionName);

        // Fetch data from the collection
        const rawData = await collection.find({}).toArray();
        
        if (!rawData || rawData.length === 0) {
            console.log('No data returned from MongoDB');
            return <DataTable data={[]} />;
        }

        // Convert MongoDB ObjectId to string
        data = rawData.map(item => ({
            ...item,
            _id: item._id.toString(), // Convert ObjectId to string
        }));

        /// Process the data to extract players
        data3 = data.flatMap((data2) => data2.players); // Collect all players into data3

    } catch (error) {
        console.error('Error fetching data from MongoDB:', error);
        return <DataTable data={[]} />;
    }
    // console.log(data3)

    return <DataTable data={data3} />;
}
