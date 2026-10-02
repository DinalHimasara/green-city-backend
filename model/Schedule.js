import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({

    scheduleNumber :{
        type: String,
        required : true,
        unique : true,
        trim : true
    },

    driver:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true
    },

    vechicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "vechicle",
        required : true
    },

    collectionDate:{
        type : Date,
        required : true
    },

    wasteCategory:{
        type: String,
        required : true,
        enum :["food waste","plastic","polythene", "paper", "glass"]
    },

    assignRoute : {
        type: String,
        required : true
    },

    distance: {
        type: Number,
        required : true,
        min : 0
    },

    dispathStatus: {
        type: String,
        enum:["pending", "active", "completed", "cancelled"],
        default: "pending"
    },

    note:{
        type: String,
        default : ""
    }
}, 
  {
    timestamps : true
  }
)

const Schedule = mongoose.model("schedule", scheduleSchema)
export default Schedule