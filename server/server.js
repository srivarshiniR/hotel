var express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
const JWT_Secretkey = "thisistoken";
const roomsRoute = require("./router/roomsRoute");
const { json } = require("body-parser");

app.use(cors());

app.use(express.json());
app.use("/api/room", roomsRoute);

require("./db");

//import schemas

require("./model/user");
require("./model/room");
require("./model/roomtype");

const User = mongoose.model("user");
const Room = mongoose.model("room");
const Roomtype = mongoose.model("roomtype");

const port = 5005;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//post api for registration
app.post("/register", async (req, res) => {
  const { name, email, password, number, aadhar, address } = req.body;

  const usermail = await User.findOne({ email });
  try {
    if (usermail) {
      res.send({ data: "User already Exists!!" });
    }

    await User.create({
      name,
      email,
      password,
      number,
      aadhar,
      address,
    });
    res.json({ message: "successfully registered", status: "ok" });
    return res;
  } catch (error) {
    console.log(error);
    res.json({ status: "error" });
  }
});

//post Api for login

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not found" });
  }
  if (password) {
    const token = jwt.sign({ email: user.email }, JWT_Secretkey, {
      expiresIn: "5d",
    });

    if (res.status(200)) {
      return res.json({ status: "ok", token: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "InvAlid Password" });
});

//Api to get user data using token

app.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_Secretkey, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });
    console.log(user);
    if (user === "token expired") {
      return res.send({ status: "error", data: "token expired", error });
    }

    const useremail = user.email;
    User.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});

//post Api for rooms

app.post("/room", async (req, res) => {
  console.log("enter value");
  try {
    console.log("start");
    const { name, maxcount, rent, type, destination, imgurl } = req.body;
    const newroom = await Room.create({
      name,
      maxcount,
      rent,
      destination,
      type,
      imgurl,
    });

    console.log({ status: "ok" });
    res.send({ status: "ok", data: newroom });
  } catch (err) {
    console.log("err", err);
  }
});

app.get("/room", async (req, res) => {
  console.log("enters");
  res.send({ status: "ok" });
});

//post room_type

app.post("/roomtype", async (req, res) => {
  console.log("enter value");
  try {
    console.log("start");
    const { hotel_id, max_member, rent, type, bed } = req.body;
    const newroom = await Roomtype.create({
      hotel_id,
      max_member,
      rent,
      type,
      bed,
    });

    console.log({ status: "ok" });
    res.send({ status: "ok", data: newroom });
  } catch (err) {
    console.log("err", err);
  }
});

//put api

app.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const detail = await Roomtype.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.send(detail);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.listen(port, () => console.log("server started @" + port));
