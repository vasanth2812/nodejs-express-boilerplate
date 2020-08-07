import express from "express";
// import path from "path";
// import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import config from "../config"

dotenv.config();
const app = express();
const errors = config.errors;
app.use(bodyParser.json());

// connect mongoose
// mongoose.connect("", { useMongoClient: true });

app.post('/api', (req, res) => {
    res.status(500).json(errors.Error_status_500);
});

// this is default in case of unmatched routes
app.use((req, res) => {
    res.status(500).json(errors.Error_status_404);
})

app.listen(process.env.PORT, () => console.log(`App running on localhost:${process.env.PORT}`));