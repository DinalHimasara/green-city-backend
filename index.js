import express from "express"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import userRouter from "./routes/userRouter.js"
import vechicleRouter from "./routes/vechicleRouter.js"
import wasteReportRouter from "./routes/wasteReportRouter.js"
import dailyWasteCollectionRouter from "./routes/dailyWasteCollectionRouter.js"
import notificationRouter from "./routes/notificationRouter.js"
import scheduleRouter from "./routes/scheduleRouter.js"


const mongoURI = "mongodb+srv://admin:1234@cluster0.az5seek.mongodb.net/?appName=Cluster0"
const app = express()
app.use(express.json())


app.use(
    (req,res,next)=>{
        const authorizationHeader = req.header("Authorization")

        if(authorizationHeader != null){
            const token = authorizationHeader.replace("Bearer ","")

            jwt.verify(token, "green&45",
                (error, content)=>{
                    if(content == null){
                        console.log(content)
                        res.status(401).json({
                            message : "Invalid Token"
                        })
                    }
                    else{
                        req.user = content
                        next()
                    }
                }
            )
        }
        else{
            next()
        }
    }
)






app.use("/users",userRouter)
app.use("/vechicle", vechicleRouter)
app.use("/wasteReport", wasteReportRouter)
app.use("/dailyWasteCollection", dailyWasteCollectionRouter)
app.use("/notification", notificationRouter)
app.use("/schedule", scheduleRouter)

mongoose.connect(mongoURI).then(
    ()=>{
        console.log("MongoDB Conected Sucessfully")
    }
)




app.listen(5000, 
    ()=>{
        console.log("server is runing")
    }
)