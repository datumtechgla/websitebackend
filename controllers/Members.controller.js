const Members = require("../models/Members.model");

const STATIC_PASSWORD = "abc@123";

const emailRegex = /^[a-zA-Z0-9._%+-]+@gla\.ac\.in$/;

const getAllMemberss = async (req, res) => {
  try {
    const members = await Members.find({});
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Memberss" ,msg:error});
  }
};

const uploadMembers = async (req, res) => {
  const { password, email, name, linkedinId, imageUrl, post, teamName } =req.body;

  if (
    post != "co-head" &&
    post != "head" &&
    post != "president" &&
    post != "vice-president" &&
    post != "mentor" &&
    post != "general-secretary" &&
    post != "member"
  ){
    return res.status(400).json({error:"post you provided is not defined"})
  }

  if (
    teamName != "tech" &&
    teamName != "event management" &&
    teamName != "design" &&
    teamName != "content" &&
    teamName != "core"
  )
  {
    return res.status(400).json({ error: "teamName you provided is not defined" });
  }
    if (password !== STATIC_PASSWORD) {
      return res.status(403).json({ error: "Unauthorized access" });
    }

  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ error: "Email must be a @gla.ac.in address" });
  }

  try {
    const mem = new Members({
      name: name.trim(),
      email: email.trim(),
      linkedinId: linkedinId.trim(),
      imageUrl: imageUrl?.trim(),
      post: post?.trim(),
      teamName: teamName?.trim(),
    });
    await mem.save();
    res.status(201).json(mem); 
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to upload Members data" ,msg:error});
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
    res.status(500).json({ error: "Failed to delete Members" ,msg:error});
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
    const members = await Members.find({
      post: { $in: validPosts.map((p) => p.toLowerCase()) },
    });
    res.status(200).json(members);
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
    res.status(500).json({ error: "Failed to fetch team members" ,msg:error });
  }
};

const searchMembers = async (req, res) => {
  const { name, linkedinId, post, teamName, email } = req.query;

  const query = {};
  if (name) query.name = { $regex: new RegExp(`^${name.trim()}$`, "i") };
  if (linkedinId)
    query.linkedinId = { $regex: new RegExp(`^${linkedinId.trim()}$`, "i") };
  if (post) query.post = { $regex: new RegExp(`^${post.trim()}$`, "i") };
  if (teamName)
    query.teamName = { $regex: new RegExp(`^${teamName.trim()}$`, "i") };
  if (email) {
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ error: "Email must be a @gla.ac.in address" });
    }
    query.email = { $regex: new RegExp(`^${email.trim()}$`, "i") };
  }

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
