import mongoose from "mongoose"

const settingSchema = new mongoose.Schema(
    {
        notificationRadiusMeters : {
            type : Number,
            default : 500
        },

        collectionDays : {
            type : [String],
            default : ["Monday", "Wednesday", "Friday"]
        },

        workingHoursStart : {
            type : String,
            default : "08:00"
        },

        workingHoursEnd : {
            type : String,
            default : "17:00"
        },

        autoRouteDispatch : {
            type : Boolean,
            default : true
        },

        smsAlerts : {
            type : Boolean,
            default : false
        }
    },
    {
        timestamps : true
    }
)

const Setting = mongoose.model("setting", settingSchema)
export default Setting