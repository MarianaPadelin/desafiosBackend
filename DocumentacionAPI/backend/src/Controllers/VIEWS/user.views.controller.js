export const registerUser = async (req, res) => {
  res.render("register", {
    fileCss: "register.css",
  });
};

export const getUsers = async (req, res) => {

  // const user = req.user

  res.render("profile", {
    id: req.user._id,
    role: req.user.role,
    user: req.user.name,
    age: req.user.age,
    email: req.user.email,
    cart: req.user.cart,
  });
};

export const getPremiumUsers = async (req, res) => {
  res.render("profilePremium", {
    id: req.user._id,
    role: req.user.role,
    user: req.user.name,
    age: req.user.age,
    email: req.user.email,
    cart: req.user.cart,
  });
};

export const restoreForm = async (req, res) => {
  res.render("newPasswordForm", {})
}


