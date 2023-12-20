import { cartModel } from "../../Models/cart.js";
import { productModel } from "../../Models/product.model.js";

class CartDao {
  async findCart() {
    return await cartModel.find();
  }

  async findCartById(_id) {
    try {
      if (mongoose.Types.ObjectId.isValid(_id)) {
        const cartFound = await cartModel.findById({ _id });

        if (cartFound) {
          return await cartModel.findById(_id);
        }
        return "Cart not found";
      }
      console.log("Formato de id no válido");
    } catch (error) {
      console.log(error);
    }
  }

  async createCart(cart) {
    try {
      if (productModel.isValid) {
        return await cartModel.create(cart);
      }

      console.log("Hay campos incompletos");
      return false;
    } catch (error) {
      console.log(error);
    }
  }

  async updateCart(_id, cart) {
    try {
      if (mongoose.Types.ObjectId.isValid(_id)) {
        const cartFound = await cartModel.findById({ _id });

        if (cartFound) {
          return await cartModel.findByIdAndUpdate({ _id }, cart);
        }
        return "Cart not found";
      }
      console.log("Formato de id no válido");
    } catch (error) {
      console.log(error);
    }
  }

  async deleteCart(_id) {
    //revisar si funciona

    try {
      if (mongoose.Types.ObjectId.isValid(_id)) {
        const cartFound = await cartModel.findById({ _id });

        if (cartFound) {
          await productModel.deleteMany({ product: _id });

          return await cartModel.findByIdAndDelete({ _id });
        }
        return "Cart not found";
      }
      console.log("Formato de id no válido");
    } catch (error) {
      console.log(error);
    }
  }

  errorMessage(error) {
    console.log(error);
    res.json({
      error,
      message: "Error",
    });
  }
}

export default new CartDao();
