

export const getUsers = async(req, res) => {

      res.render("profile", {
        role: req.user.role,
        user: req.user,
      });

}