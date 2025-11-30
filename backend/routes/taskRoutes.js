const express = require("express");
const {protect, adminOnly} = require("../middleware/authMiddleware");

const router = express.Router();

//Task Management Routes 

router.get("/dashboard-data", protect, getDashboardData);
router.get("/user-dashboard-data", protect, getUserDashboardData);
router.get("/", protect, getTasks);
router.get("/:id", protect, getTasksById);
router.post("/",protect, adminOnly, createTask);
router.put("/", protect, updateTask);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, adminOnly, deleteTask );
router.put("/:id/status", protect, updateTaskStatus);
router.put("/:id/todo", protect, updateTaskChecklist);

module.exports = router;

