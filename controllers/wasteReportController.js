import Vechicle from "../model/vechicle.js";
import WasteReport from "../model/wasteReport.js";
import { isAdmin } from "./userController.js";

export async function addWasteReport(req,res){
   if(req.user == null || req.user.role != "resident"){
    res.status(401).json({
        message : "Unauthorized Acess"
    })
    return
   }

   try{
    const lateastReport = await WasteReport.findOne().sort({createdAt: -1})

    let reportNumber = "WR000001"

    if(lateastReport!=null){
        let lateastReportId = lateastReport.reportNumber
        let lateastReportNumberString = lateastReportId.replace("WR", "")
        let lateastReportNumber = parseInt(lateastReportNumberString)

        let newReportNumber = lateastReportNumber +1
        let newReportNumberString = newReportNumber.toString().padStart(6,"0")

        reportNumber = "WR" + newReportNumberString

    }

    const wasteReport = new WasteReport({
        ...req.body,
        reportNumber,
        resident: req.user._id
    })

    await wasteReport.save()
    res.status(201).json({
        message : "Waste Report Added sucessfully"
    })
   }
   catch(error){
    return res.status(500).json({
        message : "Error Placing Order",
        error : error.message
    })
   }
    
}

export function getWasteReports(req,res){

    if(!isAdmin(req)){
            res.status(401).json({
                message : "Unautharized Acess"
            })
            return
    }

    WasteReport.find().populate("assignedVechicle", "vechicleNumber").populate("resident", "firstName lastName").then(
        (wasteReports)=>{
            res.status(200).json(wasteReports)
        }
    ).catch(
        (error)=>{
            res.status(500).json({
                message : "Error fetching vechicle"
            })
        }
    )

}

export function getWasteReportById(req,res){
    if(!isAdmin(req)){
            res.status(401).json({
                message : "Unautharized Acess"
            })
            return
    }

    const reportNumber = req.params.reportNumber

    WasteReport.findOne({reportNumber : reportNumber}).populate("assignedVechicle", "vechicleNumber").populate("resident", "firstName lastName").then(
        (wasteReports)=>{
            if(wasteReports == null){
                res.status(400).json({
                    message : "Waste Details Not Found"
                })
            }
            else{
                res.status(200).json(wasteReports)
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

export async function assignedVechicle(req,res){
    if(!isAdmin(req)){
            res.status(401).json({
                message : "Unautharized Acess"
            })
            return
    }

    try{
        const reportNumber = req.params.reportNumber
        const vechicleNumber = req.body.vechicleNumber

        const report = await WasteReport.findOne({reportNumber : reportNumber})

        if(!report){
            res.status(404).json({
                message : "Waste report not found"
            })
            return
        }

        const vechicle = await Vechicle.findOne({vechicleNumber : vechicleNumber})

        if(!vechicle){
            res.status(404).json({
                message : "Vechicle Not Found"
            })
            return
        }

        report.assignedVechicle = vechicle._id
        report.status = "assigned"

        await report.save()
        res.status(200).json({
            message : "Vechicle Assigned Scuessfully!"
        })
    }
    catch(err){
        res.status(500).json({
            error: err.message
        })
    }
}

export async function updateWasteReportStatus(req,res){
    if(!isAdmin(req)){
            res.status(401).json({
                message : "Unautharized Acess"
            })
            return
    }

    try{
        const reportNumber = req.params.reportNumber

        const status = req.body.status

        const report = await WasteReport.findOne({reportNumber:reportNumber})

        if(!report){
            res.status(404).json({
                message: "Waste Report Not Found"
            })
        }

        report.status = status

        if(status === "collected"){
            report.collectionDate = new Date()
        }

        await report.save()

        res.status(200).json({
            message : "Waste Report Status Updated Successfully!"
        })
    }
    catch(err){
        res.status(500).json({
            error : err.message
        })
    }
}

export function deleteWasteReport(req,res){
    if(!isAdmin(req)){
            res.status(401).json({
                message : "Unautharized Acess"
            })
            return
    }

    const reportNumber = req.params.reportNumber

    WasteReport.deleteOne({reportNumber:reportNumber}).then(
        ()=>{
            res.status(200).json({
                message : "Waste Report Deleted Successfully!"
            })
        }
    ).catch(
        (err)=>{
            res.status(400).json({
                error : err.message
            })
        }
    )


}



