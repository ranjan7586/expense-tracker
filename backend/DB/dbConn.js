import mongoose from "mongoose";
const dbConn = async () => {    
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected: ", conn.connection.host);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
export default dbConn