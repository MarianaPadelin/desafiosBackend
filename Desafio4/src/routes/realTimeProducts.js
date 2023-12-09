import { Router } from "express";


const realTimeProducts = Router();



realTimeProducts.get("/", async (req, res) => {

  res.render("realTimeProducts", {
    pageName: "Real Time Products",
    fileCss: "realTime.css",
  });

});


export default realTimeProducts;
