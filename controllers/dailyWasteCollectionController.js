import DailyWasteCollection from "../model/dailyWasteCollection.js"
import User from "../model/user.js"
import { isAdmin } from "./userController.js"

export async function addDailyWasteCollection(req,res){

    if(!isAdmin(req)){
                res.status(401).json({
                    message : "Unautharized Acess"
                })
                return
    
    }

    try{
        const lateastCollection = await DailyWasteCollection.findOne().sort({createdAt : -1})

        let collectionNumber = "DWC000001"

        if(lateastCollection!=null){
            let lateastCollectionId = lateastCollection.collectionNumber
            let lateastCollectionNumberString = lateastCollectionId.replace("DWC", "")
            let lateastCollectionNumber = parseInt(lateastCollectionNumberString)

            let newCollectionNumber = lateastCollectionNumber+1
            let newCollectionNumberString = newCollectionNumber.toString().padStart(6,"0")

            collectionNumber = "DWC" + newCollectionNumberString
        }


        const email = req.user.email

        const admin = await User.findOne({email : email})

        if(admin == null){
            res.status(404).json({
                message : "Admin Not Found"
            })
        }

        const dailyWasteCollection = new DailyWasteCollection({
            ...req.body,
            collectionNumber,
            recordedBy : admin._id
        })

        await dailyWasteCollection.save()
        res.status(200).json({
            message : "Waste report Added sucessfully!"
        })
    }
    catch(error){
        res.status(500).json({
             message : "Error Added",
             error : error.message
        })
    }

}

export async function getDailyWasteCollection(req,res){
    if(!isAdmin(req)){
                res.status(401).json({
                    message : "Unautharized Acess"
                })
                return
    
    }
    try{
        const collections = await DailyWasteCollection.find().populate("recordedBy", "firstName lastName").sort({collectionDate: -1})
        res.status(200).json(collections)
    }
    catch(err){
        res.status(500).json({
            error : err.message
        })
    }
    
}

export async function getDailyWasteCollectionById(req,res){

    if(!isAdmin(req)){
                res.status(401).json({
                    message : "Unautharized Acess"
                })
                return
    
    }

    try{
        const collectionNumber = req.params.collectionNumber

        const collection = await DailyWasteCollection.findOne({collectionNumber : collectionNumber}).populate("recordedBy", "firstName lastName")

        if(!collection){
            res.status(404).json({
                message : "Daily Waste Collection Not Found"
            })
            return
        }
        res.status(200).json(collection)
    }
    catch(err){
        res.status(500).json({
            error: err.message
        })
    }
}

export async function updateDailyWasteCollection(req,res){
    
    if(!isAdmin(req)){
                res.status(401).json({
                    message : "Unautharized Acess"
                })
                return
    
    }

    try{
        const collectionNumber = req.params.collectionNumber
        const collection = await DailyWasteCollection.findOne({collectionNumber : collectionNumber})

        if(!collection){
            res.status(404).json({
                message: "Daily Waste Collection Not Found"
            })
            return
        }

        collection.collectionDate = req.body.collectionDate;
        collection.category = req.body.category;
        collection.totalWeight = req.body.totalWeight;
        collection.note = req.body.note;

        await collection.save()
        res.status(200).json({
            message : "Daily Waste Collection Updated Successfully!"
        })

    }
    catch(err){
        res.status(500).json({
            error : err.message
        })
    }

}

export async function deleteDailyWasteCollection(req,res){
    if(!isAdmin(req)){
                res.status(401).json({
                    message : "Unautharized Acess"
                })
                return
    
    }

    try{
        const collectionNumber = req.params.collectionNumber
        DailyWasteCollection.deleteOne({collectionNumber:collectionNumber}).then(
            ()=>{
                res.status(200).json({
                    message : "Daily Waste Collection Deleted Successfully!"
                })
            }
        )
    }
    catch(err){
        res.status(500).json({
            error : err.message
        })
    }
}





