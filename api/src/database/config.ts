import mongoose from "mongoose";

export const MongoConnection = async (): Promise<void> => {
  try {
    await mongoose.connect(`${process.env.MONGODB_STRING}`);
  } catch (error) {
    throw new Error("Error al conectar a la base de datos.");
  }
};
