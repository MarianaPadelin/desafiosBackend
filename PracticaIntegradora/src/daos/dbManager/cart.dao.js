import { cartModel } from "../../Models/cart.js";
import { productModel } from "../../Models/product.model.js";

class CartDao {
  async findCart() {
    return await cartModel.find();
  }

  async findCartById(_id) {
    return await cartModel.findById(_id);
  }

  async createCart(cart) {
    return await cartModel.create(cart);
  }

  async updateCart(_id, cart) {
    return await cartModel.findByIdAndUpdate({ _id }, cart);
  }

  async deleteCart(_id) {

    //hay que ver sis funciona este
    await productModel.deleteMany({ product: _id });

    return await cartModel.findByIdAndDelete({ _id });
  }

   errorMessage(error){
     console.log(error);
     res.json({
       error,
       message: "Error",
     });
  }
}


export default new CartDao();