const jwt = require("jsonwebtoken");

const SECRET = "123";

// users array (temporary DB)
let users = [];

// REGISTER
function register(req, res) {
  const { email, password } = req.body;

  const exist = users.find(u => u.email === email);
  if (exist) {
    return res.json({ msg: "User already exists" });
  }

  users.push({ email, password });

  res.json({ msg: "Registered successfully" });
}

// LOGIN
function login(req, res) {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.json({ msg: "Invalid credentials" });
  }

  const token = jwt.sign({ email }, SECRET);

  res.json({ token });
}

// VERIFY
function verify(req, res, next) {
  const token = req.headers.authorization;

  if (!token) return res.json({ msg: "No token" });

  try {
    jwt.verify(token, SECRET);
    next();
  } catch {
    res.json({ msg: "Invalid token" });
  }
}

module.exports = { register, login, verify };