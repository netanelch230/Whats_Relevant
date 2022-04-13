const { Router } = require("express");

const router = new Router();
var words = [];

router.post("/removeWords", (req, res, next) => {
  const { index } = req.body;
  words.splice(index, 1);
  console.log("removeWords -> ", index);
  res.json({ words });
});
router.post("/addWords", (req, res, next) => {
  const { word } = req.body;
  words = [word, ...words];
  console.log("addWords -> ", word);
  res.json({ words });
});
router.get("/getWords", (req, res, next) => {
  console.log("getWords");
  res.json({ words });
});

module.exports = router;
