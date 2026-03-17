import Announcement from "../models/Announcement.js";

// @desc    Get all announcements
// @route   GET /api/announcements
// @access  Public
export const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find({}).sort({ createdAt: -1 });
    res.json({ success: true, count: announcements.length, data: announcements });
  } catch (error) {
    console.error(`Error fetching announcements: ${error.message}`);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// @desc    Get single announcement
// @route   GET /api/announcements/:id
// @access  Public
export const getAnnouncementById = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);

    if (announcement) {
      res.json({ success: true, data: announcement });
    } else {
      res.status(404).json({ success: false, message: "Announcement not found" });
    }
  } catch (error) {
    console.error(`Error fetching announcement: ${error.message}`);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// @desc    Create an announcement
// @route   POST /api/announcements
// @access  Private/Admin
export const createAnnouncement = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: "Title is required" });
    }

    const announcement = new Announcement({
      title,
      description,
    });

    const createdAnnouncement = await announcement.save();
    res.status(201).json({ success: true, data: createdAnnouncement });
  } catch (error) {
    console.error(`Error creating announcement: ${error.message}`);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// @desc    Update an announcement
// @route   PUT /api/announcements/:id
// @access  Private/Admin
export const updateAnnouncement = async (req, res) => {
  try {
    const { title, description } = req.body;

    const announcement = await Announcement.findById(req.params.id);

    if (announcement) {
      announcement.title = title || announcement.title;
      announcement.description = description !== undefined ? description : announcement.description;

      const updatedAnnouncement = await announcement.save();
      res.json({ success: true, data: updatedAnnouncement });
    } else {
      res.status(404).json({ success: false, message: "Announcement not found" });
    }
  } catch (error) {
    console.error(`Error updating announcement: ${error.message}`);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// @desc    Delete an announcement
// @route   DELETE /api/announcements/:id
// @access  Private/Admin
export const deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);

    if (announcement) {
      await Announcement.deleteOne({ _id: announcement._id });
      res.json({ success: true, message: "Announcement removed" });
    } else {
      res.status(404).json({ success: false, message: "Announcement not found" });
    }
  } catch (error) {
    console.error(`Error deleting announcement: ${error.message}`);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};
