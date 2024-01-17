const { User } = require("../../db");

const postGoogleController = async (userName, authId, email) => {
  const userGoogle = await User.findOne({
    where: { auth0UserId: authId },
  });

  if (!userGoogle) {
    const userGoogle = await User.create({
      auth0UserId: authId,
      auth0Email: email,
      auth0DisplayName: userName,
      username: userName,
      email: email,
    });
    return userGoogle;
  }
  return userGoogle;
};

module.exports = postGoogleController;
