const { Router } = require("express");

const router = new Router();

router.post("/signup", (req, res, next) => {
  const { phoneNumber, userName } = req.body;
  
  const message = `user success signup  ${userName} ${phoneNumber}`;
  res.json({ message });
});
router.get("/signup", (req, res, next) => {
  res.send("signup get ");
});
module.exports = router;
