const express = require("express");
const { getUsers, createUser, updateUser, deleteUser } = require("../controllers/userController");
const role = require("../middleware/role");

const router = express.Router();

router.get("/", role("admin"), getUsers);
router.post("/", role("admin"), createUser);
router.put("/:id", role("admin"), updateUser);
router.delete("/:id", role("admin"), deleteUser);

module.exports = router;
