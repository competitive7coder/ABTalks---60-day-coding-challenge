import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()


if (!process.env.MONGODB_URL) {
    throw new Error(
        "Server error , provide server connection"
    )
}

async function connectDB() {

    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            family: 4, // Force IPv4 to bypass Windows Node.js IPv6 DNS bugs
            serverSelectionTimeoutMS: 5000 // Fail fast if it can't connect
        });
        console.log("DB connected...");
    } catch (error) {
        console.log("server connection error...", error)
        console.log("Attempting to start local in-memory fallback database...");
        
        try {
            const { MongoMemoryServer } = await import('mongodb-memory-server');
            const mongoServer = await MongoMemoryServer.create();
            const mongoUri = mongoServer.getUri();
            
            await mongoose.connect(mongoUri, { dbName: "abtalks" });
            console.log("✅ Local Hackathon Database connected successfully! (Data will reset on server restart, but you can code freely without internet bugs!)");
        } catch (fallbackError) {
            console.log("Fatal Error: Could not start local database either.", fallbackError);
            process.exit(-1);
        }
    }

}

export default connectDB