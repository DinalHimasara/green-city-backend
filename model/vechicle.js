import express from "express"
import mongoose from "mongoose"

const vechicleSchema = new mongoose.Schema(
    {
        vechicleNumber : {
            type : String,
            required : true,
            unique : true,
            trim : true
        },

        vechicleType : {
            type : String,
            enum : ["Truck", "Mini Truck"],
            default : "Truck"
        },

        assignedDriver: {
            type : mongoose.Schema.Types.ObjectId,
            ref : "user",
            default : null
        },

        status : {
            type : String,
            enum : ["Available", "Collecting", "Maintenance"],
            default : "Available"
        },

        capacity : {
            type : Number,
            required : true,
            min : 1

        }
    },

    {
        timestamps: true,
    }
)

const Vechicle = mongoose.model("vechicle", vechicleSchema)

export default Vechicle 