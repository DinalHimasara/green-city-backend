import mongoose from "mongoose"

const collectionRequestSchema = new mongoose.Schema({
    _id : String,
    residentUid : String,
    residentName : String,
    address : String,
    latitude : Number,
    longitude : Number,
    wasteType : String,
    status : String,
    createdAt : Date,
    completedAt : Date
})

const CollectionRequest = mongoose.model("collectionRequest", collectionRequestSchema)
export default CollectionRequest