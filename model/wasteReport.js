import express from "express"
import mongoose from "mongoose"

const wasteReportSchema = new mongoose.Schema(
    {
        reportNumber : {
            type : String,
            required : true,
            unique : true,
            trim : true
        },
        
        resident : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "user",
            required : true
        },

        category: {
            type : String,
            enum : ["food Waste", "Plastic", "Polythene", "paper", "glass"],
            required : true

        },

        weight:{
            type : Number,
            required : true,
            min : 1
        },

        location : {
            latitude : {
                type : Number,
                required : true
            },

            longitude: {
                type : Number,
                required : true
            }
        },

        scheduledDate: { 
            type : Date,
            required : true
        },

        assignedVechicle:{
            type : mongoose.Schema.Types.ObjectId,
            ref:"vechicle",
            default : null
        },

        status:{
            type: String,
            enum:["pending","assigned","collecting","collected","cancelled"],
            default : "pending"
        },

        collectionDate:{
            type: Date,
            default : null
        },

        note :{
            type : String,
            default : ""
        }
    },
    {
        timestamps: true,
    }
)

const WasteReport = mongoose.model("wasteReport", wasteReportSchema)
export default WasteReport