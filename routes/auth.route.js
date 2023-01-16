import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import { body } from "express-validator";
import { validationResultExpress } from "../middlewares/validationResultExpress.js";
const router = express.Router();

router.get(
  "/login",
  [
    body("email", "formato de email incorrecto :V")
      .trim()
      .isEmail()
      .normalizeEmail(),
    body("password", "minimo 6 caracteres").trim().isLength({ min: 6 }),
  ],
  validationResultExpress,
  login
);

router.post(
  "/register",
  [
    body("email", "formato de email incorrecto :V")
      .trim()
      .isEmail()
      .normalizeEmail(),
    body("password", "contraseña incorrecta o formato password :V").custom(
      (value, { req }) => {
        if (value !== req.body.repassword) {
          throw new Error("no coinciden las contraseñas");
        }
        return value;
      }
    ),
    body("password", "minimo 6 caracteres").trim().isLength({ min: 6 }),
  ],
  validationResultExpress,
  register
);

export default router;
