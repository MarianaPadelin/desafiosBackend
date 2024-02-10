import MessagesDao from "../daos/dbManager/messages.dao.js";

export const getChat = async (req, res) => {
  const message = req.body;
  const user = req.body;

  const messages = await MessagesDao.addMessage(message);

  res.render("chat", {
    messages,
  });
};
