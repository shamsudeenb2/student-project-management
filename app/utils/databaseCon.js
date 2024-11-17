import mongoose from "mongoose";
const uri = "mongodb+srv://shamsudeenb2:pGU0ZEJH8YZPHobA@cluster0.v8zbozf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
const connection = {};

export const connectToDB = async () => {
  try {
    if (connection.isConnected) return;
    const db = await mongoose.connect(process.env.MONGO, clientOptions);
    connection.isConnected = db.connections[0].readyState;
    console.log("nice one", connection.isConnected)
  }catch (error) {
    console.log(error)
    // throw new Error(error);
  }
};