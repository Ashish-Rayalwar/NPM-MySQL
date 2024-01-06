const { signup, login } = require("../../controller/userController");

const router = require("express").Router();

// router.post("/signup",signup)

// module.exports = router

module.exports = (router) => {
  // router.use([verifyToken]);
  router.post("/signup", signup);
  router.post("/login", login);
  return router;
};
