const {
  signup,
  addtocart,
  getCart,
} = require("../../controller/userController");


module.exports = (router) => {
  // router.use([verifyToken]);
  router.post("/", addtocart);
  router.get("/", getCart);
  return router;
};
