import generateTokken from "../services/generateJWT.js";
import { User, Role, Person, AccessToken } from "./database/modelsDB.js";

class UserModel {
  // GET
  static async getAll() {
    try {
      const users = await User.findAll({
        include: [
          { model: Person, attributes: ["name", "surname"] },
          { model: Role, attributes: ["name"] },
          { model: AccessToken, attributes: ["token", "expiration"] },
        ],
        attributes: ["id", "email", "password", "createdAt", "updatedAt"],
      });
      return users;
    } catch (error) {
      throw new Error("Error getting users: ", error);
    }
  }

  // POST
  static async create({ person, user }) {
    try {
      // Create Person
      const newPerson = await Person.create(person);
      // Create user
      const myUser = { ...user, person_id: newPerson.id };
      const newUser = await User.create(myUser);
      // Create Access Token
      const accessToken = generateTokken({ user: newUser });
      const infoToken = { ...accessToken, user_id: newUser.id };
      await AccessToken.create(infoToken);

      const userCreated = await User.findOne({
        where: { id: newUser.id },
        include: [
          {
            model: Person,
            attributes: ["name", "surname", "direction", "phone"],
          },
          { model: Role, attributes: ["name"] },
          { model: AccessToken, attributes: ["token", "expiration"] },
        ],
        attributes: ["id", "email", "password", "createdAt", "updatedAt"],
      });

      return userCreated;
    } catch (error) {
      throw new Error("Error creating user: ", error);
    }
  }

  // UPDATE
  static async update({ userId, user, person }) {
    console.log(user);
    try {
      const myUser = await User.findByPk(userId);
      let updatedRowsCount = 0;

      // Updated User
      await Person.update(person, {
        where: { id: myUser.person_id },
      });
      updatedRowsCount = await User.update(user, {
        where: { id: userId },
      });

      if (updatedRowsCount === 0) {
        throw new Error("User not found or no record updated.");
      }
      // Update Access Token
      const accessToken = generateTokken({ user: myUser });
      const infoToken = { ...accessToken, user_id: userId };
      await AccessToken.update(infoToken, {
        where: { user_id: userId },
      });

      const userUpdated = await User.findOne({
        where: { id: myUser.id },
        include: [
          { model: Person, attributes: ["name", "surname"] },
          { model: Role, attributes: ["name"] },
          { model: AccessToken, attributes: ["token", "expiration"] },
        ],
        attributes: ["id", "email", "password", "createdAt", "updatedAt"],
      });

      return userUpdated;
    } catch (error) {
      throw new Error("Error updating user:", error);
    }
  }

  // DELETE
  static async delete({ userId }) {
    try {
      const user = await User.findByPk(userId);
      if (user) {
        await Person.destroy({
          where: { id: user.person_id },
        });
      } else {
        throw new Error("User not found");
      }

      return { message: "User successfully deleted" };
    } catch (error) {
      throw new Error("Error deleting user: ", error);
    }
  }

  // GET BY ID
  static async getById({ userId }) {
    try {
      const user = await User.findByPk(userId, {
        include: [
          {
            model: Person,
            attributes: ["name", "surname", "phone", "direction"],
          },
          { model: Role, attributes: ["name"] },
          { model: AccessToken, attributes: ["token", "expiration"] },
        ],
        attributes: ["id", "email", "password", "createdAt", "updatedAt"],
      });

      if (!user) {
        throw new Error("User not found");
      }

      return user;
    } catch (error) {
      throw new Error("Error getting user: ", error);
    }
  }

  // LOGIN
  // GET BY EMAIL
  static async getUser({ userEmail }) {
    console.log(userEmail);
    const user = await User.findOne({
      where: { email: userEmail },
    });
    return user;
  }

  // UPDATE TOKEN
  static async updateToken({ userId, token }) {
    try {
      const newToken = { token: token };

      const [updatedRowsCount] = await AccessToken.update(newToken, {
        where: { user_id: userId },
      });

      if (updatedRowsCount === 0) {
        throw new Error("Token not was updated.");
      }
      return token;
    } catch (error) {
      throw new Error("Error updating token: ", error);
    }
  }
}

export default UserModel;
