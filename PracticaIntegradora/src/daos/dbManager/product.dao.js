import { productModel } from "../../Models/product.model.js";
//hacer funcion catch con cartel de error y console log de error

class ProductDao {
    async addProduct(nuevoProducto){
        try{
            await productModel.create(nuevoProducto);     
        } catch(error){
            console.log(error)
        }
       
    }

    async getAllProducts(){
        try{
            return await productModel.find();
        } catch(error){
            console.log(error)
        }
        
    }

    async getProductById(_id){
        try {
          return await productModel.findById({ _id })
        } catch (error) {
          console.log("id not found")
          console.log(error);
        }
    }

    async deleteProduct(_id){
        try {
          return await productModel.findByIdAndDelete({ _id })
        } catch (error) {
          console.log(error);
        }
    }

    async modifyProduct(_id, newProduct){
        try {
          return await productModel.findByIdAndUpdate({ _id }, newProduct)
          // await productModel.findOne(id);
          // if (!id) {
          //   console.log("No se encontró el producto");
          // } else {
          //   return await productModel.findByIdAndUpdate({ _id }, newProduct);
          // }
        } catch (error) {
          console.log(error);
        }
    }

    errorMessage(error){
         console.log(error);
         res.json({
           error,
           message: "Error",
         });
    }
}

export default new ProductDao()