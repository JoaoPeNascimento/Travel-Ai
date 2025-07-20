import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "secreto_dev";

export function generateToken(userId: string) {
  return jwt.sign({ userId }, SECRET, { expiresIn: "1h" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, SECRET) as { userId: string };
}
