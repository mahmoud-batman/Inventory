const getAllUsers = (req, res) => {
  res.send("getAllUsers");
};

const registerUser = (req, res) => {
  res.send("Register");
};

module.exports = {
  registerUser,
  getAllUsers,
};
