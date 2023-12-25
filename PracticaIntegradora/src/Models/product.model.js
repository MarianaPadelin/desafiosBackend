import {Schema, model} from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, index: true },
  state: {type: Boolean, default: true},
  thumbnail: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  stock: { type: Number, required: true },
});


//el model tiene como parámetros la colección de la data base y el schema
const productModel = model("products", productSchema);

export { productModel };