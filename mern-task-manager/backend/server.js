const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const ConnectDB = require("./config/db");

dotenv.config();

ConnectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/tasks", require("./routes/taskRoute"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
