import { comparePasswords } from "../services/authService.js";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

class LoginController {
  constructor({ userModel }) {
    this.userModel = userModel;
  }

  login = async (req, res) => {
    const { email, password } = req.body;

    const user = await this.userModel.getUser({ userEmail: email });
    let passwordCorrect = false;
    if (user != null) {
      passwordCorrect = await comparePasswords(password, user.password);
    }

    if (!(user && passwordCorrect)) {
      return res.status(401).json({
        error: "Invalid user or password",
      });
    }

    const userForToken = {
      id: user.id,
      email: user.email,
      rol: user.role_id,
    };

    // Updating JWT
    const token = jwt.sign(userForToken, process.env.SECRET, {
      expiresIn: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
    });
    const updatedToken = await this.userModel.updateToken({
      userId: user.id,
      token,
    });
    if (!updatedToken) return res.json({ error: "Token was not updated" });

    // Save Token
    const serialized = serialize("sesion_security_token", updatedToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 30,
      path: "/",
    });

    res.setHeader("Set-Cookie", serialized);

    res.json({
      id: user.id,
      email: user.email,
    });
  };
}

export default LoginController;
