const express = require("express");
const router = express.Router();

const draftController = require("../Controllers/ExamDraftController");

router.post("/create", draftController.postDraft);
router.get("/all/:userId", draftController.getAllDraft);
router.get("/:examId", draftController.getDraft);
router.put("/:examId", draftController.updateDraft);

module.exports = router;
