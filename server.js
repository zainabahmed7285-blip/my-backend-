const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

let items = [{ id: 1, name: "First item" }];
let nextId = 2;

app.get("/", (req, res) => res.send("Backend is running"));

// READ
app.get("/api/items", (req, res) => res.json(items));

// CREATE
app.post("/api/items", (req, res) => {
  const item = { id: nextId++, name: req.body.name };
  items.push(item);
  res.status(201).json(item);
});

// UPDATE
app.put("/api/items/:id", (req, res) => {
  const item = items.find((i) => i.id === Number(req.params.id));
  if (!item) return res.status(404).json({ message: "Not found" });
  item.name = req.body.name;
  res.json(item);
});

// DELETE
app.delete("/api/items/:id", (req, res) => {
  items = items.filter((i) => i.id !== Number(req.params.id));
  res.json({ message: "Deleted" });
});

app.listen(PORT, () => console.log("Server running on port " + PORT));