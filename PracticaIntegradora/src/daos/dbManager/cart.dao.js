import { cartModel } from "../../Models/cart.model.js";
import { productModel } from "../../Models/product.model.js";
import mongoose from "mongoose";

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
      // if (productModel.isValid) {
      //   return await cartModel.create(cart);
      // }

      // console.log("Hay campos incompletos");
      // return false;
      return await cartModel.create(cart);
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

  async addProductToCart(_id) {
    try {
      if (mongoose.Types.ObjectId.isValid(_id)) {
        //busco el carrito
        const cartFound = await cartModel.findById({ _id });

        if (cartFound) {
         //dentro del carrito, busco si ya existe el producto
          const productoRepetido = cartModel.findById(
            "6581ca591b93ee9b747e0ba9"
          );

          // console.log(productoRepetido)
          //(este id lo pongo como pid en parámetro de la función)

          if (!productoRepetido) {
            //si el producto no está, lo pusheo al array
            const prodAgregado = cartFound.products.push(
              "6581ca591b93ee9b747e0ba9"
            );

            console.log("no lee el producto repetido")

            //  console.log(cartFound.products);
          } else {
          //  si el producto ya existe, le agrego 1 a quantity
            const nuevaCantidad = productoRepetido.quantity + 1;
            productoRepetido.quantity = nuevaCantidad;
            console.log(nuevaCantidad)
          }
         

          //buscamos el id DEL PRODUCTO y poblamos el campo products
          const prodPoblado = await cartModel
            .findById("65818a4fcb5379434b37ada2")
            .populate("products");

           console.log(prodPoblado)

          //actualizo en la base de datos.
          const result = await cartModel.findByIdAndUpdate(
            { _id: cartFound._id },
            cartFound
          );
          console.log(result.products);
        }
        return "Cart not found";
      }
      console.log("Formato de id no válido");
    } catch (error) {
      console.log(error);
    }
  }

  async deleteOneProduct(_id, _pid){

    try {
      if (mongoose.Types.ObjectId.isValid(_id)) {
        const cartFound = await cartModel.findById({ _id });

        if (cartFound) {
          await productModel.deleteMany({ product: _pid });

          // return await cartModel.findByIdAndDelete({ _id });
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
