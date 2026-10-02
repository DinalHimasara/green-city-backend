import express from "express"
import { addWasteReport, assignedVechicle, deleteWasteReport, getWasteReportById, getWasteReports, updateWasteReportStatus } from "../controllers/wasteReportController.js"
const wasteReportRouter = express.Router()

wasteReportRouter.post("/", addWasteReport)
wasteReportRouter.get("/", getWasteReports)
wasteReportRouter.get("/:reportNumber", getWasteReportById)
wasteReportRouter.put("/:reportNumber/assign-vehicle", assignedVechicle)
wasteReportRouter.put("/:reportNumber/status", updateWasteReportStatus)
wasteReportRouter.delete("/:reportNumber", deleteWasteReport)

export default wasteReportRouter