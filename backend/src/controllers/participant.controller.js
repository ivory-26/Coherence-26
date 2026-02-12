import Participant from "../models/Participant.js";

export const createParticipant = async (req, res) => {
    try {
        console.log("Req Body:", req.body);

        const { name, college, domain, bio, linkedin, github, imageUrl } = req.body;

        if (!name || !college || !domain || !bio || !linkedin || !github || !imageUrl) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const participant = await Participant.create({
            name,
            college,
            domain,
            bio,
            linkedin,
            github,
            imageUrl,
        });

        res.status(201).json({
            success: true,
            participant,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getParticipants = async (req, res) => {
    try {
        const participants = await Participant.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            participants,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
