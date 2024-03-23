require("dotenv").config();
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET;

function generateToken(data, res) {
  const { useremail } = data;
  if (!useremail) {
    return res.status(400).json({
      error: "Missing user email in the request body.",
      token: null,
    });
  }
  const payload = {
    useremail: useremail,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" }); // Token expires in 24 hour
  res.json({ token: token });
}

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN
  if (token == null) return res.sendStatus(401); // No token provided
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403); // Invalid token
    req.user = user;
    next();
  });
};

module.exports = {
  generateToken,
  authenticateToken,
};
