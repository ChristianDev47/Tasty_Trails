import {
  validateUser,
  validatePartialUser,
} from "../schemas/validations/user.js";
import { hashPassword } from "../services/authService.js";

class UserController {
  constructor({ userModel }) {
    this.userModel = userModel;
  }

  // GET
  getAll = async (req, res) => {
    try {
      const users = await this.userModel.getAll();
      res.status(200).json(users);
    } catch (error) {
      console.error("Error getting users: ", error);
      res.status(404).json({ error: "Error getting users" });
    }
  };

  // CREATE
  create = async (req, res) => {
    try {
      if (req.body.role_id == undefined) req.body.role_id = 2;

      const result = validateUser(req.body);
      if (!result.success) {
        return res
          .status(400)
          .json({ error: JSON.parse(result.error.message) });
      }

      const { name, surname, email, password, role_id } = result.data;
      // Verify email user
      const existEmail = await this.userModel.getUser({ userEmail: email });
      if (existEmail) {
        return res
          .status(401)
          .json({ error: "Email is used in other account" });
      }

      // Hash the password before creating the user
      const hashedPassword = await hashPassword(password);

      const person = { name, surname };
      const user = {
        email,
        password,
        role_id,
        password: hashedPassword,
      };

      const newUser = await this.userModel.create({ person, user });
      res.status(201).json(newUser);
    } catch (error) {
      console.error("Error creating user: ", error);
      res.status(400).json({ error: "Error creating user" });
    }
  };

  // UPDATE
  update = async (req, res) => {
    try {
      const result = validatePartialUser(req.body);
      if (!result.success) {
        return res
          .status(400)
          .json({ error: JSON.parse(result.error.message) });
      }

      const userId = req.params.id;
      const { name, surname, phone, direction, email, password, role_id } =
        result.data;
      // Person
      const dataPerson = { name, surname, phone, direction };
      const person = Object.fromEntries(
        Object.entries(dataPerson)
          .filter(([key, value]) => value !== undefined)
          .map(([key, value]) => [key, value])
      );

      // User
      const dataUser = { email, password, role_id };
      const user = Object.fromEntries(
        Object.entries(dataUser)
          .filter(([key, value]) => value !== undefined)
          .map(([key, value]) => [key, String(value)])
      );

      if (user.password) {
        const hashedPassword = await hashPassword(user.password);
        user.password = hashedPassword;
      }

      const updatedUser = await this.userModel.update({ userId, person, user });
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(400).json({ error: "Error updating user" });
    }
  };

  // DELETE
  delete = async (req, res) => {
    try {
      const userId = req.params.id;
      const result = await this.userModel.delete({ userId });

      res.status(200).json(result);
    } catch (error) {
      console.error("Error deleting user: ", error);
      res.status(404).json({ error: "Error deleting user" });
    }
  };

  // GET BY ID
  getById = async (req, res) => {
    try {
      const userId = req.params.id;
      const result = await this.userModel.getById({ userId });

      res.status(200).json(result);
    } catch (error) {
      console.error("User not found: ", error);
      res.status(404).json({ error: "User not found" });
    }
  };
}

export default UserController;
