import Setting from "../model/setting.js"
import { isAdmin } from "./userController.js"

export async function getSetting(req,res){
    if(!isAdmin(req)){
        res.status(401).json({
            message : "Unautharized Acess"
        })
        return
    }

    try{
        let setting = await Setting.findOne()

        if(setting == null){
            setting = new Setting()
            await setting.save()
        }

        res.status(200).json(setting)
    }
    catch(err){
        res.status(500).json({
            error : err.message
        })
    }
}

export async function updateSetting(req,res){
    if(!isAdmin(req)){
        res.status(401).json({
            message : "Unautharized Acess"
        })
        return
    }

    try{
        const setting = await Setting.findOneAndUpdate({}, req.body, {
            new : true,
            upsert : true,
            setDefaultsOnInsert : true
        })

        res.status(200).json({
            message : "Settings Updated Successfully!",
            setting : setting
        })
    }
    catch(err){
        res.status(500).json({
            error : err.message
        })
    }
}