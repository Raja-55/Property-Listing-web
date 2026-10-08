const mongoose = require("mongoose");

const connection = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);

        console.log(
            `Database connection: ${connect.connection.host}`
        );
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1);
    }
};

module.exports = connection;