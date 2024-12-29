const express = require("express");
const {
  getAllMemberss,
  uploadMembers,
  deleteMembers,
  getFilteredMemberss,
  getTeamMembers,
  searchMembers,
} = require("../controllers/Members.controller");

const router = express.Router();

router.get("/", getAllMemberss);
router.post("/upload", uploadMembers);
router.delete("/delete", deleteMembers);
router.get("/filtered", getFilteredMemberss);
router.get("/team-members", getTeamMembers);
router.get("/search", searchMembers);



module.exports = router;
