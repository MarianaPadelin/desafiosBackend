import { Schema, model } from "mongoose";


const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },//encriptar
});

const userModel = model("users", userSchema);
export { userModel };
