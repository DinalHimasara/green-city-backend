import mongoose from "mongoose";

const dailyWasteCollectionSchema = new mongoose.Schema(
    {
        collectionNumber : {
            type: String,
            required : true,
            unique : true,
            trim : true

        },

        collectionDate:{
            type: Date,
            required: true,
            default: Date.now
        },

        category:{
            type: String,
            required : true,
            enum : ["food Waste", "Plastic", "Polythene", "paper", "glass"]
        },

        totalWeight:{
            type: Number,
            required : true,
            min : 0
        },

        recordedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required : true
        },

        note : {
            type : String,
            default : ""
        }
    },
    {
        timestamps : true
    }
    
)

const DailyWasteCollection = mongoose.model("dailyWasteCollection", dailyWasteCollectionSchema)
export default DailyWasteCollection