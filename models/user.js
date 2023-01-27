import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  try {
    const salta = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(user.password, salta);
    next();
  } catch (error) {
    console.log(error);
    throw new Error("fallo el hash de contraseña");
  }
});

userSchema.methods.comparePassword = async function (canditatePassword) {
  return await bcryptjs.compare(canditatePassword, this.password);
};

export const User = mongoose.model("User", userSchema);
