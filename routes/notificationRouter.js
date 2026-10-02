import express from "express"
import { addNotification, getNotification } from "../controllers/notificationController.js"

const notificationRouter = express.Router()

notificationRouter.post("/", addNotification)
notificationRouter.get("/", getNotification)

export default notificationRouter