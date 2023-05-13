// This js file is for verifying whether a logged in person is a user or doctor and also to maintain the session.

// Middlewares functions are the callback function with next keyword. That is it will move forward our code instead of stopping.

// Using this route, our backend is now protected.
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const authToken = req.headers["authorization"].split(" ")[1];
    jwt.verify(authToken, process.env.SECRET, (err, decode) => {
      if (err) {
        // console.log("failed");
        res.status(200).send({
          message: "Auth Failed",
          success: false,
        });
      } else {
        // console.log(decode.id);
        req.body.userId = decode.id;
        next();
      }
    });
  } catch (error) {
    console.log("Error");
    res.status(400).send({
      message: "Something went wrong",
      success: false,
    });
  }
};
