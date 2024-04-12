import userDao from "../DAOS/mongoDB/user.dao.js";

class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }
  getUser = async (uid) => {
    return await userDao.getUser(uid);
  };
  updateUserStatus = async (uid, role) => {
    return await userDao.updateUserStatus(uid, role);
  };
  updateUserFiles = async (uid, imgName, imgPath) => {
    return await userDao.updateUserFiles(uid, imgName, imgPath)
  }
  updatePassword = async (email, password) => {
    return await userDao.updatePassword(email, password);
  };
  updateConnection = async (email, loginTime) => {
    return await userDao.updateConnection(email, loginTime);
  };
  findUser = async (email) => {
    return await userDao.findUser(email);
  };
}

export default new UserRepository();
