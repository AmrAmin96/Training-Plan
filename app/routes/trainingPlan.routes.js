const router = require("express").Router();
const { generatePlan } = require("../controllers/trainingPlan.controller");

// get Country with population
router.post("/generatePlan", generatePlan);

module.exports = router;
