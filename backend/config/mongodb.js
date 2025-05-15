import mongoose from "mongoose";
const connectDb = async () => {
  mongoose.connection.on("connected", () => {
    console.log("Databse Connected.");
  });
  await mongoose.connect(`${process.env.MONGODB_URI}/ecommerce`);
};
export default connectDb;
