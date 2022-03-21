import mongoose from "mongoose";
import {ObjectId} from "mongodb";
import clientPromise from "../mongodb";

const Event = new mongoose.Schema({
    createdBy: {
        type: ObjectId,
        required: true,
        immutable: true
    },
    name: {
        type: String,
        required: true
    },
    startsAt: {
        type: String
    },
    endsAt: {
        type: String
    }
}, {collection: "Events"});

export default mongoose.models.Event || mongoose.model("Event", Event);