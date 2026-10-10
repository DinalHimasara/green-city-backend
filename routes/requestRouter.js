import express from "express"
import { getRequests } from "../controllers/requestController.js"

const requestRouter = express.Router()

requestRouter.get("/", getRequests)

export default requestRouter