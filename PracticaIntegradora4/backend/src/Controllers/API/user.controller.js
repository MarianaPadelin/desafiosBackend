import userRepository from "../../Services/Repository/user.repository.js";
import { generateJWToken } from "../../dirname.js";
import { logUser } from "./jwt.controller.js";

export const switchUser = async (req, res) => {
  const { uid } = req.params;
  req.logger.info(uid);
  const currentRole = req.user.role;
  const userStatus = req.user.status;

  //para cambiar de user a premium
  if (currentRole === "user") {
    if (userStatus === "docsUploaded") {
      req.user.role = "premium";
    } else
      return res
        .status(400)
        .send("Error. Primero debe subir los documentos correspondientes");
    //para cambiar de premium a user
  } else {
    req.user.role = "user";
  }

  const newRole = req.user.role;
  req.logger.info(newRole);
  const user = req.user;

  await userRepository.updateUserStatus(uid, newRole);
  const access_token = generateJWToken(user);
  res.cookie("jwtCookieToken", access_token, {
    maxAge: 600000,
    httpOnly: true,
  });
  res.status(200).send(newRole);
};

export const getUser = async (req, res) => {
  const { uid } = req.params;
  const user = await userRepository.getUser(uid);
  res.status(200).send(user);
};

export const uploadFiles = async (req, res) => {
  const { uid } = req.params;
  const { destination } = req.params;
  const uploadedFiles = req.files;
  if (!req.files) {
    return res
      .status(400)
      .send({ status: "error", mensaje: "No se adjunto archivo." });
  }
  // console.log(req.file);
  uploadedFiles.forEach((file) => {
    const imgPath = file.path;
    const imgName = file.originalname;

    userRepository.updateUserFiles(uid, imgName, imgPath);
    if (destination === "profile") {
      req.logger.info("Imagen subida a profile");
    } else if (destination === "products") {
      req.logger.info("Imagen subida a products");
    } else {
      req.logger.info("Imagen subida a documents");
    }
  });

  res.send({
    status: "Success",
    message: `Imagenes agregadas con éxito`,
  });
};
