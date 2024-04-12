import { userModel } from "../../Models/user.model.js";
import mongoose from "mongoose";
// import { createHash } from "../../../utils/authorizations.js";
import __dirname, { createHash } from "../../../dirname.js";
class UserDao {
  async getUser(uid) {
    try {
      if (mongoose.Types.ObjectId.isValid(uid)) {
        return await userModel.findById({ uid });
      }
      logger.error("ID format not valid");
    } catch (error) {
      return error;
    }
  }

  async updateUserStatus(_id, role) {
    try {
      if (mongoose.Types.ObjectId.isValid(_id)) {
        const userExists = await userModel.findById({ _id });

        if (userExists) {
          let result = await userModel.findByIdAndUpdate(
            { _id },
            { rol: role }
          );
          return result;
        }
        return "User not found";
      }
    } catch (error) {
      return error;
    }
  }

  async updateUserFiles(_id, imgName, imgPath) {
    try {
      if (mongoose.Types.ObjectId.isValid(_id)) {
        const userExists = await userModel.findById({ _id });

        if (userExists) {
          //me hace el update de a un solo elemento, por eso pongo 2 funciones:
          await userModel.findByIdAndUpdate({ _id }, { status: "docUploaded" });
          let result = await userModel.findByIdAndUpdate(
            { _id },
            {
              $push: {
                documents: {
                  name: imgName,
                  reference: imgPath,
                },
              },
            }
          );
          return result;
        }
        return "User not found";
      }
    } catch (error) {
      return error;
    }
  }

  async updatePassword(email, password) {
    try {
      const newPassword = createHash(password);
      const result = await userModel.findOneAndUpdate(
        { email: email },
        { password: newPassword }
      );
      return result;
    } catch (error) {
      return error;
    }
  }

  async updateConnection(email, loginTime) {
    try {
      const result = await userModel.findOneAndUpdate(
        { email: email },
        { last_connection: loginTime }
      );
      return result;
    } catch (error) {
      return error;
    }
  }

  async findUser(email) {
    try {
      const userExists = await userModel.findOne({ email: email });
      return userExists;
    } catch (error) {
      return error;
    }
  }
}

export default new UserDao();
