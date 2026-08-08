import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: 'B:/Complete WebDev/ABTalks---60-day-coding-challenge/server/.env' });

async function testConn() {
    try {
        console.log("Connecting with default settings...");
        await mongoose.connect(process.env.MONGODB_URL, {
            serverSelectionTimeoutMS: 5000
        });
        console.log("SUCCESS! Connected without family: 4");
        process.exit(0);
    } catch (e) {
        console.log("Failed without family: 4 ->", e.message);
        process.exit(1);
    }
}
testConn();
