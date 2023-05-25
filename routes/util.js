const jwt = require("jsonwebtoken");

const authRequired = (req, res, next) => {
  try {
    const token = req.signedCookies.token;
    jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    res.status(401).send({
      status: 401,
      status_message: "Unauthorized",
      data: null,
    });
    return;
  }
  next();
};

module.exports = { authRequired };
