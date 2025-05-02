import mongoose from "mongoose";

const connectToMongoDB = async () => {
    try {
        const connected = await mongoose.connect(process.env.MONGO_URI)

        console.log(`MongoDB connected: ${connected.connection.host}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}


export default connectToMongoDB