import CollectionRequest from "../model/collectionRequest.js"
import { isAdmin } from "./userController.js"

export async function getRequests(req,res){
    if(!isAdmin(req)){
        res.status(401).json({
            message : "Unautharized Acess"
        })
        return
    }

    try{
        const requests = await CollectionRequest.find().sort({createdAt : -1})
        res.status(200).json(requests)
    }
    catch(err){
        res.status(500).json({
            error : err.message
        })
    }
}