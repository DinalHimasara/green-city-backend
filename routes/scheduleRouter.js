import express from "express"
import { addSchedule, deleteSchedule, getSchedule, getScheduleById, updateSchedule} from "../controllers/sheduleController.js"

const scheduleRouter = express.Router()

scheduleRouter.post("/",addSchedule)
scheduleRouter.get("/",getSchedule)
scheduleRouter.get("/:scheduleNumber", getScheduleById)
scheduleRouter.put("/:scheduleNumber", updateSchedule)
scheduleRouter.delete("/:scheduleNumber", deleteSchedule)

export default scheduleRouter