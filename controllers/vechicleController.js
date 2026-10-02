import User from "../model/user.js";
import Vechicle from "../model/vechicle.js";
import { isAdmin } from "./userController.js";


export function addVechicle(req,res){
    if(!isAdmin(req)){
        res.status(401).json({
            message : "Unauthrized Acess"
        })
        return
    }

    const vechicle = new Vechicle(req.body)

    vechicle.save().then(
        ()=>{
            res.json({
                message : "New Vechicle Aded"
            })
        }
    )
}

export function getVechicle(req,res){
    if(!isAdmin(req)){
        res.status(401).json({
            message : "Unautharized Acess"
        })
        return
    }

    Vechicle.find().then(
        (vechicles)=>{
           res.json(vechicles)
        }
    )
}


export function getVechicleById(req,res){
    const vechicleNumber = req.params.vechicleNumber

    if(!isAdmin(req)){
        res.status(401).json({
            message : "Unautharized Acess"
        })
        return
    }

    Vechicle.findOne({vechicleNumber : vechicleNumber}).populate("assignedDriver", "firstName lastName").then(
        (vechicle)=>{
            if(vechicle == null){
                res.status(400).json({
                    message : "Vechicle Not found"
                })
            }
            else{
                res.json(vechicle)
            }
        }
    ).catch(
        (error)=>{
            res.status(500).json({
                message : "Error fetching vechicle"
            })
        }
    )
}

export function updateVechicle(req,res){
    const vechicleNumber = req.params.vechicleNumber

    if(!isAdmin(req)){
        res.status(401).json({
            message : "Unautharized Acess"
        })
        return
    }

    Vechicle.updateOne({vechicleNumber : vechicleNumber}, req.body).then(
        ()=>{
            res.status(200).json({
                message : "Vechicle Updated Sucessfully !"
            })
        }
    ).catch((err)=>{
        console.log(err)
        res.status(400).json({
            error : err.message
        })
    })

}

export function deleteVechicle(req,res){
    const vechicleNumber = req.params.vechicleNumber

    if(!isAdmin(req)){
        res.status(401).json({
            message : "Unautharized Acess"
        })
        return
    }

    Vechicle.deleteOne({vechicleNumber : vechicleNumber}).then(
        ()=>{
            res.status(200).json({
                message : "Vechicle Delete Sucessfully"
            })
        }
    ).catch((err)=>{
        console.log(err)
        res.status(400).json({
            error : err.message
        })
    })
}

export async function assignDriver(req,res){
    try {
        const vechicleNumber = req.params.vechicleNumber
        const email = req.body.email

        const driver = await User.findOne({email})

        if(!driver){
            res.status(404).json({
                message : "Driver not found"
            })
            return
        }

        if(driver.role !== "driver"){
            res.status(400).json({
                message : "user is not a driver"
            })
        }

        const vechicle = await Vechicle.findOne({vechicleNumber : vechicleNumber})

        if(!vechicle){
            res.status(404).json({
                message : "vechicle not found"
            })
        }

        vechicle.assignedDriver = driver._id,

        await vechicle.save()

        res.status(200).json({
            message : "Driver assigned Sucessfully"
        })
    }
    catch(err){
        res.status(500).json({
            message : err.message
        })
    }
}