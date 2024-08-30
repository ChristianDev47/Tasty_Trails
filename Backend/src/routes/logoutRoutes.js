import { Router } from "express";
import LogoutController from "../controllers/logout.js";

function LogoutRouter({ userModel }) {
  const logoutRoutes = Router();
  const logoutController = new LogoutController({ userModel });

  // RUTAS
  logoutRoutes.post("/", logoutController.logout);
  return logoutRoutes;
}

export default LogoutRouter;
