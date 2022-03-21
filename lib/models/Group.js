import mongoose from "mongoose";
import clientPromise from "../mongodb";

const Group = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        immutable: true
    },
    members: {
        type: Array,
        default: []
    },
    messages: {
        type: Array,
        default: []
    },
    events: {
        type: Array,
        default: []
    },
}, {collection: "Groups"});

export default mongoose.models.Group || mongoose.model("Group", Group);