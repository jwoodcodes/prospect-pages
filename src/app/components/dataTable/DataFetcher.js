'use server'

import DataTable from './DataTable';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // Ensure this is set in your .env.local file
const dbName = 'astronauts-college';
const collectionName = 'all-rookie-guide-years';

export default async function DataFetcher() {
    let data = [];
    let client; // Declare client variable here
    let data3 = []; // Initialize data3 as an empty array

    try {
        client = new MongoClient(uri); // Initialize client
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);

        // Fetch data from the collection
        const rawData = await collection.find({}).toArray();

        // Convert MongoDB ObjectId to string
        data = rawData.map(item => ({
            ...item,
            _id: item._id.toString(), // Convert ObjectId to string
        }));

        // Process the data to extract players
        data3 = data.flatMap((data2) => data2.players); // Collect all players into data3

    } catch (error) {
        console.error('Error fetching data from MongoDB:', error);
    } finally {
        if (client) {
            await client.close(); // Close the client if it was initialized
        }
    }

    return <DataTable data={data3} />; // Pass data3 to DataTable
}
