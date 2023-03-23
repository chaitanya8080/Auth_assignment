

import mongoose from "mongoose";

import * as dotenv from "dotenv";

dotenv.config()

mongoose.set('strictQuery', false)

export const connection = mongoose.connect(process.env.MONGO_URI,);

