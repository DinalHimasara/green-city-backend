import express from "express"
import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
        nic :{
            type : String,
            required : true,
            unique : true,
            trim : true

        },

        email : {
            type : String,
            required : true,
            unique : true
        },

        firstName :{
            type : String,
            required : true
        },

        lastName : {
            type : String,
            required : true
        },

        password : {
            type : String,
            required : true
        },

        isEmailVerified :{
            type : Boolean,
            default : false
        },

        phone: {
            type: String,
            required: true,
        },

        address : {
            type : String,
            default : ""
        },

        image : {
            type : String,
            default : "/defult.png"
        },

        isBlock : {
            type : Boolean,
            default : false
        },

        
        role : {
            type : String,
            enum : ["admin", "driver", "resident"],
            default : "resident"
        },

        status : {
            type : String,
            enum : ["active","inactive"],
            default : "active"
        },

        currentLocation : {
            latitude : {
                type : Number,
                default : null
            },

            longitude:{
                type: Number,
                default : null
            }
        },
    },

    {
        timestamps: true,
    }
)

const User = mongoose.model("user",userSchema)
export default User