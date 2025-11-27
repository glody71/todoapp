const express = require("express");
const router = express.Router();
const controller = require("../controllers/todoControllers");

router.post("/", controller.create);
router.delete("/:id", controller.delete);
router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
router.patch("/:id/complete", controller.toggleCompletion);
router.put("/:id", controller.update);

module.exports = router;
