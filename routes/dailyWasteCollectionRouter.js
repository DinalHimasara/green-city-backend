import express from "express"
import { addDailyWasteCollection, deleteDailyWasteCollection, getDailyWasteCollection, getDailyWasteCollectionById, updateDailyWasteCollection } from "../controllers/dailyWasteCollectionController.js"

const dailyWasteCollectionRouter = express.Router()

dailyWasteCollectionRouter.post("/",addDailyWasteCollection)
dailyWasteCollectionRouter.get("/",getDailyWasteCollection)
dailyWasteCollectionRouter.get("/:collectionNumber", getDailyWasteCollectionById)
dailyWasteCollectionRouter.put("/:collectionNumber", updateDailyWasteCollection)
dailyWasteCollectionRouter.delete("/:collectionNumber", deleteDailyWasteCollection)

export default dailyWasteCollectionRouter