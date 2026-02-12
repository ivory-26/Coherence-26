import mongoose from "mongoose";

const participantSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        college: {
            type: String,
            required: true,
            trim: true,
        },
        domain: {
            type: String,
            required: true,
            trim: true,
        },
        bio: {
            type: String,
            required: true,
            trim: true,
        },
        linkedin: {
            type: String,
            required: true,
            match: /^https:\/\/(www\.)?linkedin\.com\/.*$/,
        },
        github: {
            type: String,
            required: true,
            match: /^https:\/\/(www\.)?github\.com\/.*$/,
        },
        imageUrl: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Participant = mongoose.model("Participant", participantSchema);

export default Participant;
