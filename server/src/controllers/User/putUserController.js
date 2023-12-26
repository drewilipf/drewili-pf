const { User } = require("../../db");

const putUserController = async (id, updatedUserData) => {
  const user = await User.findByPk(id);

  if (!user) throw new Error("el usuario no existe");

  await user.update(updatedUserData);
};
module.exports = putUserController;
