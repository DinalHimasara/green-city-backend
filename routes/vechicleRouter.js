import express from "express"
import { addVechicle, assignDriver, deleteVechicle, getVechicle, getVechicleById, updateVechicle} from "../controllers/vechicleController.js"

const vechicleRouter = express.Router()

vechicleRouter.post("/", addVechicle)
vechicleRouter.get("/",getVechicle)
vechicleRouter.get("/:vechicleNumber", getVechicleById)
vechicleRouter.put("/:vechicleNumber", updateVechicle)
vechicleRouter.delete("/:vechicleNumber", deleteVechicle)
vechicleRouter.put("/:vechicleNumber/assign-driver", assignDriver)

export default vechicleRouter