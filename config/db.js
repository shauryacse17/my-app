const mongoose = require('mongoose');

// Function to establish a connection to the MongoDB database
const connectDB = async () => {
    try {
        // Attempt to connect to the MongoDB database
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true, // Use new URL string parser
            useUnifiedTopology: true, // Use the new topology engine
        });

        // Log a success message with the host name
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        // Log the error message if connection fails
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // Exit the process with failure code
    }
};

module.exports = connectDB;
