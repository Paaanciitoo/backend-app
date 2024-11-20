import express from "express";
import { authenticate } from "../middlewares/authenticate";

const router = express.Router();

router.get("/", authenticate, (req, res) => {
  res.json({ message: "Esta es una ruta protegida", user: (req as any).user });
});

export default router;
