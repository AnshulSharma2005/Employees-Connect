import { Router } from "express";
import { AppDataSource } from "../utils/dataSource";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const userRepository = AppDataSource.getRepository(User);

  const existingUser = await userRepository.findOneBy({ email });
  if (existingUser) return res.status(400).json({ success: false, error: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = userRepository.create({ name, email, password: hashedPassword });
  await userRepository.save(newUser);

  res.status(201).json({ success: true, message: "User created successfully" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ email });
  if (!user) return res.status(401).json({ success: false, error: "Invalid credentials" });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(401).json({ success: false, error: "Invalid credentials" });

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: "1h" });
  res.json({ success: true, user, token });
});

export default router;
