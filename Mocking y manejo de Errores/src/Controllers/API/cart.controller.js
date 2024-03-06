import { sendEmail } from "../../dirname.js";
import CartRepository from "../../Services/Repository/cart.repository.js";
import CartDao from "../../Services/DAOS/mongoDB/cart.dao.js";
import TicketRepository from "../../Services/Repository/ticket.repository.js";
import productsRepository from "../../Services/Repository/products.repository.js";
import EErrors from "../../Services/errors/error-dictionary.js";
import CustomError from "../../Services/errors/customError.js";
import {
  emptyCart,
  invalidIDError,
} from "../../Services/errors/messages/cartErrors.msg.js";

//agregar validacion de si no existe el producto

export const getCarts = async (req, res) => {
  try {
    const carts = await CartRepository.getAll();

    res.json({
      message: "These are the carts:",
      data: carts,
    });
  } catch (error) {
    CartDao.errorMessage(error);
  }
};

export const getOneCart = async (req, res) => {
  try {
    const { id } = req.params;

    const cart = await CartRepository.getById(id);

    let totalPrice = await CartRepository.getTotal(cart);

    let products = cart.products;

    res.render("cartView", {
      cart: id,
      message: `This is the cart with id ${id}:`,
      products,
      amount: totalPrice,
    });
  } catch (error) {
    console.log(error);
    res.send({
      message: "Cart not found",
      error: error,
    });
  }
};

export const postCart = async (req, res) => {
  try {
    const cart = await CartRepository.save();
    res.send({
      data: cart,
    });
  } catch (error) {
    console.log(error);
    res.send({
      message: "Couldn't create cart",
      error: error,
    });
  }
};

export const addProductToCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { pid } = req.params;
    // console.log(id + pid);

    const cart = await CartRepository.getById(id);
    if (cart) {
      CartRepository.addProduct(id, pid);

      return res.status(200).json({
        message: `Product ${pid} added to cart ${id}`,
        cart,
      });
    }
    return CustomError.createError({
      name: "No se encontró el carrito",
      message: "El id del carrito no existe en la base de datos.",
      cause: invalidIDError(id),
      code: EErrors.DATABASE_ERROR,
    });
  } catch (error) {
    console.log(error.cause);
    return res.status(500).send({ error: error.code, message: error.message });
  }
};

export const changeProductQuantity = async (req, res) => {
  const { cid } = req.params;
  const { pid } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await CartRepository.getById(cid);
    if (cart) {
      CartRepository.updateProduct(cid, pid, quantity);

      return res.json({
        cart,
      });
    }
    return CustomError.createError({
      name: "No se encontró el carrito",
      message: "El id del carrito no existe en la base de datos.",
      cause: invalidIDError(id),
      code: EErrors.DATABASE_ERROR,
    });
  } catch (error) {
    console.log(error.cause);
    return res.status(500).send({ error: error.code, message: error.message });
  }
};

export const deleteCart = async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await CartRepository.getById(cid);
    if (cart) {
      CartRepository.delete(cid);

      return res.status(200).json({
        cart,
      });
    }
    return CustomError.createError({
      name: "No se encontró el carrito",
      message: "El id del carrito no existe en la base de datos.",
      cause: invalidIDError(id),
      code: EErrors.DATABASE_ERROR,
    });
  } catch (error) {
    console.log(error.cause);
    return res.status(500).send({ error: error.code, message: error.message });
  }
};

export const deleteProductFromCart = async (req, res) => {
  const { cid } = req.params;
  const { pid } = req.params;

  try {
    const cart = await CartRepository.getById(cid);
    if (cart) {
      CartRepository.deleteProduct(cid, pid);

      return res.json({
        data: cart,
      });
    }
    return CustomError.createError({
      name: "No se encontró el carrito",
      message: "El id del carrito no existe en la base de datos.",
      cause: invalidIDError(id),
      code: EErrors.DATABASE_ERROR,
    });
  } catch (error) {
    console.log(error.cause);
    return res.status(500).send({ error: error.code, message: error.message });
  }
};

export const finalizarCompra = async (req, res) => {
  const { cid } = req.params;

  try {
    const cart = await CartRepository.getById(cid);
    if (cart) {
      const amount = await CartRepository.getTotal(cart);
      if (amount !== 0) {
        const purchase_datetime = new Date();
        const ticket = {
          amount,
          cart,
          purchaser: req.user.email,
          purchase_datetime,
        };

        cart.products.map((product) =>
          //genero un nuevo producto con el stock reducido
          {
            const newProduct = {
              title: product._id.title,
              description: product._id.description,
              price: product._id.price,
              code: product._id.code,
              category: product._id.category,
              stock: product._id.stock - product.quantity,
              thumbnails: product._id.thumbnails,
            };
            // console.log(newProduct)
            productsRepository.update(product._id._id, newProduct);
          }
        );

        const result = await TicketRepository.save(ticket);

        sendEmail(result.id, req.user.email);

        const ticketGenerado = await TicketRepository.getById(result._id);
        // console.log("Ticket generado: " + ticketGenerado);

        //Vacío el carrito:
        await CartRepository.delete(cid);
        return res.status(200).send({ result });
        // res.status(200).json({ ticketGenerado })
      }
     return CustomError.createError({
        name: "El carrito está vacío",
        message:
          "El carrito debe tener productos para poder finalizar la compra. ",
        cause: emptyCart(id),
        code: EErrors.DATABASE_ERROR,
      });

    }
    return CustomError.createError({
      name: "No se encontró el carrito",
      message: "El id del carrito no existe en la base de datos.",
      cause: invalidIDError(id),
      code: EErrors.DATABASE_ERROR,
    });
  } catch (error) {
    console.log(error.cause);
    return res.status(500).send({ error: error.code, message: error.message });
  }
};
