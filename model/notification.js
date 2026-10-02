import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({

    notificationNumber :{
        type : String,
        required : true,
        unique : true,
        trim : true
    },

    recipientGroup:{
        type: String,
        required : true,
        enum : ["all residents","all drivers","all users"]
    },

    notificationType:{
        type : String,
        required : true,
        enum : ["Standard Broadcast","Collection Reminder","Emergency Alert"]
    },

    title:{
        type : String,
        required : true,
        trim : true
    },

    message : {
        type : String,
        required : true,
        trim : true
    },

    sentBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true
    },

    sentAt :{
        type : Date,
        default : Date.now
    }

},
{
    timestamps : true
}

)

const Notification = mongoose.model("notification", notificationSchema)
export default Notification