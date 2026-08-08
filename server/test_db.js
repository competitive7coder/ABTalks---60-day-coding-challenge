import mongoose from 'mongoose';

const uri = "mongodb://protyushghorui2001_db_user:DVMcJwOiezuc4Oxs@ac-5kl6nhp-shard-00-00.hmuo7p5.mongodb.net:27017,ac-5kl6nhp-shard-00-01.hmuo7p5.mongodb.net:27017,ac-5kl6nhp-shard-00-02.hmuo7p5.mongodb.net:27017/abtalks?ssl=true&replicaSet=atlas-5kl6nhp-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose.connect(uri)
  .then(() => {
    console.log("DB connected successfully!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("DB connection error:", err);
    process.exit(1);
  });
