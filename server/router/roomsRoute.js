const express = require("express");
const router = express.Router();

const roomModel = require("../model/room");
const roomtypeModel = require("../model/roomtype");

//get room details

router.get("/getrooms", async (req, res) => {
  try {
    const rooms = await roomModel.find({});
    return res.json({ rooms });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

//get room details by id

router.get("/getroombyid/:roomid", async (req, res) => {
  const roomid = req.params.roomid;

  try {
    const room = await roomModel.findOne({ _id: roomid });
    return res.send({ room });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});

//get roomtype details

router.get("/getroomstype", async (req, res) => {
  try {
    const roomstype = await roomtypeModel.find({});
    return res.json({ roomstype });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

//get roomstype details by id

router.get("/getroomstypebyid/:roomstypeid", async (req, res) => {
  const roomtypeid = req.params.roomid;

  try {
    const roomstype = await roomtypeModel.findOne({ _id: roomtypeid });
    return res.send({ roomstype });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});


//aggregate

router.get("/aggregate", async (req, res) => {
  try {
    var aggregate = [
      {
        $lookup: {
          from: "rooms",
          localField: "hotel_id",
          foreignField: "_id",
          as: "roomstype",
        },
      },
    ];
    const detail = await roomtypeModel.aggregate(aggregate);

    res.json(detail);
  } catch (err) {
    res.send("Error" + err);
  }
});

module.exports = router;
