import { Router } from "express";

const router = Router();


router.get("/register", async (req, res) => {
  res.render("register", {
    fileCss: "register.css",
  });
});


//deberia ser el home
router.get("/profile", async (req, res) => {
  res.render("profile", {
    // user: req.session.user
  });
});

export default router;