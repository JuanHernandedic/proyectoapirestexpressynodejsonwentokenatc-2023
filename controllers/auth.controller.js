import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user)
      return res.status(403).json({ error: "no existe el usuario registrado" });

    const respuestaPassword = await user.comparePassword(password);
    if (!respuestaPassword)
      return res.status(403).json({ error: "contraseña incorrecta" });

    //jsonwebtokrn

    const token = jwt.sign({ uid: user._id }, process.env.JWT_SECRET);

    return res.json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error de servidor" });
  }
};

export const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    //alternativa bvuscando por email jquery
    let user = await User.findOne({ email });
    if (user) throw { code: 11000 };
    user = new User({ email, password });
    await user.save();

    //jwt tokern
    return res.status(201).json({ ok: "registrado" });
  } catch (error) {
    console.log(error);
    //alternatica por defecto de mongoose
    console.log(error.code);
    if (error.code === 11000) {
      return res.status(400).json({ error: "ya existe este usuario" });
    }
    return res.status(500).json({ error: "Error de servidor" });
  }
};
