// Simple in-memory storage for event status
// In a real app, this should be in a database (e.g. Settings collection)
let eventStatus = "idle"; // "idle" | "running"

export const startEvent = (req, res) => {
  try {
    eventStatus = "running";
    console.log("Event Started");
    res.status(200).json({ success: true, message: "Event started", status: eventStatus });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const endEvent = (req, res) => {
  try {
    eventStatus = "idle";
    console.log("Event Stopped");
    res.status(200).json({ success: true, message: "Event stopped", status: eventStatus });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getEventStatus = (req, res) => {
  try {
    res.status(200).json({ success: true, status: eventStatus });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const finalizeTeam = async (req, res) => {
    try {
        const { team_name } = req.params;
        // Placeholder logic for AI review generation
        // in real usage, this would call an AI service and update the Team model
        
        // Mock response
        res.status(200).json({
            success: true,
            message: `Review generated for ${team_name}`,
            review: "Automated analysis completed. Code quality looks good."
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
