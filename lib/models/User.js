import mongoose from "mongoose";
import clientPromise from "../mongodb";

const User = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        immutable: true
    },
    joinedAt: {
        type: String,
        default: () => {
            return new Date(Date.now()).toLocaleString();
        },
        immutable: true
    },
    interests: {
        type: Array,
        default: []
    },
    active: {
        type: Boolean,
        default: true
    }
}, {collection: "Users"});

export default mongoose.models.User || mongoose.model("User", User);