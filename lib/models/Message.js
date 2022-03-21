import mongoose from "mongoose";
import {ObjectId} from "mongodb";
import clientPromise from "../mongodb";

const Message = new mongoose.Schema({
    userID: {
        type: ObjectId,
        required: true,
        immutable: true
    },
    contents: {
        type: String,
        required: true
    },
    postedAt: {
        type: String,
        default: () => {
            return new Date(Date.now()).toLocaleString();
        },
        immutable: true
    }
}, {collection: "Messages"});

export default mongoose.models.Message || mongoose.model("Message", Message);