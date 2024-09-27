import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.cookies.sesion_security_token;
  if (!token) return res.status(401).json({ error: "Acceso denegado" });
  try {
    const verified = jwt.verify(token, process.env.SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: "token no es válido" });
  }
};

export default verifyToken;
