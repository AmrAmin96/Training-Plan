const express = require("express");
const cors = require("cors");

// Server routes
const trainingPlanRoutes = require("./app/routes/trainingPlan.routes");
const app = express();

var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

app.use(express.json());
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Training Plan App" });
});

//////trainingPlan////////
app.use("/trainingPlan", trainingPlanRoutes);

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
