import express from "express"
import { createUser, getUser, loginUser, updateUserStatus } from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.get("/",getUser)
userRouter.post("/",createUser)
userRouter.post("/login", loginUser)
userRouter.put("/togale-satus/:email",updateUserStatus)

export default userRouter