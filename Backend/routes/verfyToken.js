const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) {
        res.status(403).json("Your token is invalid");
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    res.status(401).json("You are not authenticated");
  }
};

// to make sure user has correct authentiation
const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that.");
    }
  });
};

// Check if user is admin. Only admin should be able to update order and products
const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    // key difference is the condition parameter. If user is admin then allow the next function
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that.");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
