import jwt from "jsonwebtoken";

export default function generateTokken({ user }) {
  const userForToken = {
    id: user.id,
    email: user.email,
    rol: user.role_id,
  };
  // Implementando JWT
  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: process.env.TIME,
  });

  const currentDate = new Date();
  const daysToAdd = parseInt(process.env.EXPIRED_TIME);

  const expirationDate = new Date(currentDate);
  expirationDate.setDate(currentDate.getDate() + daysToAdd);

  const expiration = expirationDate.toISOString().split("T")[0];

  return { token, expiration };
}
