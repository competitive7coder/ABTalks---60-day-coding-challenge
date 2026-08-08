import mongoose from 'mongoose';
import dotenv from 'dotenv';
// Load from the server directory
dotenv.config({ path: 'B:/Complete WebDev/ABTalks---60-day-coding-challenge/server/.env' });

const migrateTracks = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to DB.");

        const result1 = await mongoose.connection.collection('challenges').updateMany(
            { challenge_name: "web-dev" },
            { $set: { challenge_name: "Full Stack" } }
        );
        console.log(`Migrated ${result1.modifiedCount} "web-dev" challenges to "Full Stack"`);

        const result2 = await mongoose.connection.collection('challenges').updateMany(
            { challenge_name: "AI / ML" },
            { $set: { challenge_name: "AI/ML" } }
        );
        console.log(`Migrated ${result2.modifiedCount} "AI / ML" challenges to "AI/ML"`);

        const result3 = await mongoose.connection.collection('challenges').updateMany(
            { challenge_name: "Mobile Development" },
            { $set: { challenge_name: "Mobile" } }
        );
        console.log(`Migrated ${result3.modifiedCount} "Mobile Development" challenges to "Mobile"`);

        const result4 = await mongoose.connection.collection('challenges').updateMany(
            { challenge_name: "DSA & Algorithms" },
            { $set: { challenge_name: "DSA" } }
        );
        console.log(`Migrated ${result4.modifiedCount} "DSA & Algorithms" challenges to "DSA"`);
        
        console.log("Migration complete.");
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

migrateTracks();
