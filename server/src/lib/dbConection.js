import mongoose from "mongoose"

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnection() {
    if (cached.conn) {
        return {conn: cached.conn, sucess: true}
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        }
        cached.promise = mongoose.connect(process.env.MONGO_URI, opts)
        .then((mongoose) => {
            return mongoose
        })
        .catch((error) => {
            throw error
        })
    }

    try {
        cached.conn = await cached.promise
    } catch (error) {
        cached.promise = null
        return {sucess: false, error: error}
    }

    return {conn: cached.conn, sucess: true}
}

export default dbConnection