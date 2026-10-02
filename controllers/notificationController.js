import Notification from "../model/notification.js"
import { isAdmin } from "./userController.js"

export async function addNotification(req,res){

    if(!isAdmin(req)){
        res.status(401).json({
            message : "Unautharized Acess"
        })
        return    
    }

    try{
        const lateastNotification = await Notification.findOne().sort({createdAt:-1})

        let notificationNumber = "NT000001"

        if(lateastNotification != null){
            let latestNotificationId = lateastNotification.notificationNumber;
            let latestNotificationNumberString = latestNotificationId.replace("NT", "");
            let latestNotificationNumber = parseInt(latestNotificationNumberString);

            let newNotificationNumber = latestNotificationNumber + 1;
            let newNotificationNumberString = newNotificationNumber.toString().padStart(6, "0");

            notificationNumber = "NT" + newNotificationNumberString;    
        }

        const notification = new Notification({
                ...req.body,
                notificationNumber,
                sentBy : req.user._id //req.user.email
            })

            await notification.save()

            res.status(200).json({
                message : "Notification Sent Successfully!"
            })
    }
    catch(err){
        res.status(500).json({
            message : "Error Sending Notification",
            error : err.message
        })
    }

}

export function getNotification(req,res){

    if(!isAdmin(req)){
        res.status(401).json({
            message : "Unautharized Acess"
        })
        return    
    }

    Notification.find().populate("sentBy", "firstName lastName").then(
        (notifications)=>{
            res.status(200).json(notifications)
        }
    ).catch(
        (err)=>{
            console.log(err)
            res.status(400).json({
                error : err.message
            })
        }
    )
}

export function deleteNotification(req,res){
    if(!isAdmin(req)){
        res.status(401).json({
            message : "Unautharized Acess"
        })
        return    
    }

    const notificationNumber = req.params.notificationNumber
    Notification.deleteOne({notificationNumber : notificationNumber}).then(
        ()=>{
            res.status(200).json({
                message : "Notification Deleted Successfully!"
            })
        }
    ).catch((err)=>{
        console.log(err)
        res.status(400).json({
            error : err.message
        })
    })
}

