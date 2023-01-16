import mongoose from "mongoose";

try {
  await mongoose.connect(process.env.URI_MONGO);
  console.log("connect DB hecha 👁️");
} catch (error) {
  console.log("Error de conexion a mongodb💢: " + error);
}
