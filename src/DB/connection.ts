import mongoose from "mongoose";

const connected = async() :Promise<void> =>{
    await mongoose.connect(process.env.MONGO_URI || '').then(() =>{
        console.log("Connected to DB");
    }).catch((err:any) =>{
        console.log("Failed to connect to DB.");
        process.exit(1);
    })
}

export default connected