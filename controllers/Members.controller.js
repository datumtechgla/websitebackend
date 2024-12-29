const Members = require("../models/Members.model");

const STATIC_PASSWORD = "abc@123"; 

const getAllMemberss = async (req, res) => {
  try {
    const Members = await Members.find();
    res.status(200).json(Members);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Memberss" });
  }
};

const uploadMembers = async (req, res) => {
  const { password, name, linkedinId, imageUrl, post, teamName } = req.body;

  if (password !== STATIC_PASSWORD) {
    return res.status(403).json({ error: "Unauthorized access" });
  }

  try {
    const Members = new Members({
      name: name.trim(),
      linkedinId: linkedinId.trim(),
      imageUrl: imageUrl?.trim(),
      post: post?.trim(),
      teamName: teamName?.trim(),
    });
    await Members.save();
    res.status(201).json(Members);
  } catch (error) {
    res.status(500).json({ error: "Failed to upload Members data" });
  }
};

const deleteMembers = async (req, res) => {
  const { password, MembersId } = req.body;

  if (password !== STATIC_PASSWORD) {
    return res.status(403).json({ error: "Unauthorized access" });
  }

  try {
    const deletedMembers = await Members.findByIdAndDelete(MembersId);
    if (!deletedMembers) {
      return res.status(404).json({ error: "Members not found" });
    }
    res.status(200).json({ message: "Members deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete Members" });
  }
};

const getFilteredMemberss = async (req, res) => {
  const { post } = req.query;
  const validPosts = [
    "head",
    "co-head",
    "president",
    "vice-president",
    "mentor",
  ];

  try {
    const Memberss = await Members.find({
      post: { $in: validPosts.map((p) => p.toLowerCase()) },
    });
    res.status(200).json(Memberss);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Memberss" });
  }
};

const getTeamMembers = async (req, res) => {
  const { teamName } = req.query;

  try {
    const members = await Members.find({ teamName: teamName.trim() });
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch team members" });
  }
};

const searchMembers = async (req, res) => {
  const { name, linkedinId, post, teamName } = req.query;

  const query = {};
  if (name) query.name = { $regex: new RegExp(`^${name.trim()}$`, "i") };
  if (linkedinId)
    query.linkedinId = { $regex: new RegExp(`^${linkedinId.trim()}$`, "i") };
  if (post) query.post = { $regex: new RegExp(`^${post.trim()}$`, "i") };
  if (teamName)
    query.teamName = { $regex: new RegExp(`^${teamName.trim()}$`, "i") };

  try {
    const members = await Members.find(query);
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ error: "Failed to search members" });
  }
};

module.exports = {
  getAllMemberss,
  uploadMembers,
  deleteMembers,
  getFilteredMemberss,
  getTeamMembers,
  searchMembers,
};


