const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/Users");

const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://arielcalipay2:arielcalipay2001@cluster1.sabil6t.mongodb.net/merntesting?retryWrites=true&w=majority"
);

app.get("/getUsers", async (req, res) => {
  try {
    const users = await UserModel.find({});
    console.log(users); // Add this line to log the 'users' variable
    res.json(users);
  } catch (err) {
    console.error(err); // Add this line to log any errors
    res.json(err);
  }
});



app.post("/createUser", async (req, res) => {
  try {
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save();

    res.json(newUser); // Respond with the newly created user
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "Failed to create user" });
  }
});

app.listen(3001, () => {
  console.log("SERVER RUNS PERFECTLY!");
});
