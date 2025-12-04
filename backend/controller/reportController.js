const Task = require("../models/Tasks");
const User = require("../models/User");
const excelJS = require("exceljs");

const exportTaskReport = async (req,res) => {
    try {
        const tasks = await Task.find().populate("assignedTo", "name email");

        const workbook = new excelJS.Workbook();
        const worksheet = workbook.addWorksheet("Tasks Report");

        worksheet.columns = [
            {header: "TASK ID", key:"_id", width: 25 },
            {header: "TITLE", key:"title", width: 30 },
            {header: "DESCRIPTION", key:"description", width: 50 },
            {header: "PRIORITY", key:"priority", width: 15 },
            {header: "STATUS", key:"status", width: 20 },
            {header: "DUE DATE", key:"dueDate", width: 20 },
            {header: "ASSIGNED TO", key:"assignedTo", width: 30 },
        ];

        tasks.forEach((task) => {
            const assignedTo = task.assignedTo
                .map((user) => `${user.name} (${user.email})`)
                .join(", ");

                worksheet.addRow({
                    _id: task._id,
                    title: task.title,
                    description: task.description,
                    priority: task.priority,
                    status: task.status,
                    dueDate: task.dueDate.toISOString().split("T")[0],
                    assignedTo: assignedTo || "Unassigned",
                })

                res.setHeader(
                    "Content-Type",
                    "application/vnd.openxmlformates-officedocument.spreadsheetml.sheet"
                );

                res.setHeader(
                    "Content-Disposition",
                    'attachment;  filename="tasks_report.xlsx" '
                );

                return workbook.xlsx.write(res).then(() => {
                    res.end();
                });
        })

    }
    catch(error){
        res
        .status(500)
        .json({message: "Error getting Report", error: error.message});
    }
};

const exportUserReport =async (req,res) => {
    try {
        const users = await User.find().select("name email _id").lean();
        const userTasks = await Task.find().populate("assignedTo", "name email _id");

        const userTaskMap = {};
        users.forEach((user) => {
            userTaskMap[user._id] = {
                name: user.name,
                email: user.email,
                taskCount: 0,
                pendingTasks: 0,
                inProgressTasks: 0,
                completedTasks: 0,
            };
        });

        userTasks.forEach((task) => {
            if(task.assignedTo) {
                task.assignedTo.forEach((assignedUser) => {
                    if(userTaskMap[assignedUser._id]) {
                        userTaskMap[assignedUser._id].taskCount += 1;
                        if(task.status === "Pending") {
                            userTaskMap[assignedUser._id].pendingTasks += 1;
                        } else if (task.status === "In Progress") {
                            userTaskMap[assignedUser._id].inProgressTasks += 1;
                        } else if (task.status === "Completed"){
                            userTaskMap[assignedUser._id].completedTasks += 1;

                        }
                    }
                });
            }
        });

        
        const workbook = new excelJS.Workbook();
        const worksheet = workbook.addWorksheet("Users Report");

        worksheet.columns = [
            {header: "User Name", key:"name", width: 30 },
            {header: "EMAIL", key:"email", width: 40 },
            {header: "TOTAL ASSIGNED TASKS", key:"taskCount", width: 20 },
            {header: "PENDING TASKS", key:"pendingTasks", width: 20 },
            {header: "IN PROGRESS TASKS", key:"inProgressTasks", width: 20 },
            {header: "Completed Tasks", key:"completedTasks", width: 20 },
        ];

        Object.values(userTaskMap).forEach((user) => {
            worksheet.addRow(user);
        });

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocuments.spreadsheet.sheet"
        );

        res.setHeader(
            "Content-Disposition",
            'attachment; filename="users_report.xlsx"'
        );

        return workbook.xlsx.write(res).then(() => {
            res.end();
        });

    }
    catch(error){
        res
        .status(500)
        .json({message: "Error getting Users", error: error.message});
    }
};

module.exports = {exportTaskReport, exportUserReport};