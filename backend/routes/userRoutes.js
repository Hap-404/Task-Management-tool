const express = require("express");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const { getUsers, getUserById, deleteUser } = require("../controller/userController");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

//User Management  Routes

router.get("/", protect, adminOnly, getUsers); //Get all users (admin only)
router.get("/:id", protect, getUserById); //Get a specific user
router.delete("/:id", protect, adminOnly, deleteUser); //Delete a user (admin only)

module.exports = router;