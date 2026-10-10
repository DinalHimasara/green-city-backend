import express from "express"
import { getSetting, updateSetting } from "../controllers/settingController.js"

const settingRouter = express.Router()

settingRouter.get("/", getSetting)
settingRouter.put("/", updateSetting)

export default settingRouter