const express = require("express");
const cors = require("cors");
const todoRoutes = require("./routes/todoRoutes");
const categoryRoutes = require("./routes/categoryRoutes")

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Running..." });
});

app.use("/api/todos", todoRoutes);
app.use("/api/categories", categoryRoutes)

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
