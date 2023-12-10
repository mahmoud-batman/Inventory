const getAllUsers = (req, res) => {
  res.send("getAllUsers");
};

const registerUser = (req, res, next) => {
  const { name } = req.body;
};

module.exports = {
  registerUser,
  getAllUsers,
};
