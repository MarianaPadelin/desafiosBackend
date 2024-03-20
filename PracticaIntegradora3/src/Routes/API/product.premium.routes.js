import { Router } from "express";
import {
  getOwnerProducts,
  getOneProduct,
  postProduct,
  changeProduct,
  deleteProduct,
} from "../../Controllers/API/products.controller.js";
import {
  getEditForm,
  getOwnerForm,
} from "../../Controllers/VIEWS/admin.views.controller.js";
import { passportCall, authorization } from "../../dirname.js";
// import { passportCall, authorization } from "../../utils/authorizations.js";

const router = Router();

router.get(
  "/",

  passportCall("jwt"),
  authorization("premium"),
  getOwnerProducts
);

// router.get(
//   "/addProduct",
//   passportCall("jwt"),
//   authorization("premium"),
//   getOwnerForm
// );

router.get(
  "/editProduct/:pid",
  passportCall("jwt"),
  authorization("premium"),
  getEditForm
);

// router.get("/:id", getOneProduct);

// router.post("/", passportCall("jwt"), authorization("premium"), postProduct);

//auth a premium pero SOLO a sus propios productos, hacer una ruta aparte con sus propios productos para put y delete
//router.put("/:uid/product/:pid")
//router.put("/:uid/product/:pid")
router.put(
  "/:uid/product/:pid",
  passportCall("jwt"),
  authorization("premium"),
  changeProduct
);

router.delete(
  "/:uid/product/:pid",
  passportCall("jwt"),
  authorization("premium"),
  deleteProduct
);

export default router;
