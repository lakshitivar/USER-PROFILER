import mongoose from 'mongoose';
import { DB_NAME } from '../constant.js';

const connectDb = async () =>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.DB_URL}/${DB_NAME}`)
        // console.log(connectionInstance)
        console.log("database connected")
    } 
    catch (error) {
        console.log("database connection failed",error)
        process.exit(1)
    }
}

export default connectDb
