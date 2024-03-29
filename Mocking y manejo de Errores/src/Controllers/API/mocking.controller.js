import { generateProducts } from "../../dirname.js"

export const getMocks = async (req, res) => {
  try {
    let products = [];
    for (let i = 0; i < 100; i++) {
      products.push(generateProducts());
    }
    res.status(200).json({ status: "success", payload: products });
 
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: error, message: "Impossible to get products." });
  }
};
