const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const validateNamePassword = (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }

  if (name.toString().length < 6) {
    res.status(400);
    throw new Error("Name must be up to 6 characters");
  }
  
  if (password.toString().length < 6) {
    res.status(400);
    throw new Error("Password must be up to 6 characters");
  }
};

module.exports = {
  generateToken,
  validateNamePassword,
};
