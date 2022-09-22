const uuid = require("uuid").v4;
const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware");
const Room = require("../models/RoomDetail.model")
const upload = require("../middlewares/imageUpload.middleware");

// @route   POST /api/room
// @desc    Create a new room
router.post("/", upload.single("imgUrl"), auth, async (req, res) => {
    const { room_number, number_of_students, status, room_cost, title,  } = req.body;
    
    try {
        
      const roomObj = new Room({
        usr:req.userId,
        _id: room_number,
        num_of_students: number_of_students,
        status:status[0],
        room_cost,
      })
      console.log(roomObj);
      if (req.file) roomObj.imgUrl = req.file.path
      await roomObj.save()
    //   const room = await new Room(roomObj).save();
      
      res.status(201).json("LLl");
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Server error" });
    }
});

// @route   GET /api/rooms
// @desc    Get all rooms
router.get("/", auth, async (req,res) => {
    try {
        const rooms = await Room.find({usr:req.userId})

        if(!rooms){
            res.status(404).json({msg : "No Rooms Found."})
        }
        console.log(req.userId)
        res.status(200).json(rooms)
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: "Server Error"})
    }
})

// @route   PATCH /api/rooms
// @desc    Update a room
router.patch("/:roomId", async (req,res) => {
    const { room } = req.body

    try {

        let room = await Room.findById(req.params.roomId)

        if(!room){
            return res.status(404).json({msg: "Room not found"})
        }
        const roomObj = {
            title:room
        }

        room = await Room.findByIdAndUpdate(req.params.roomId, roomObj, {
            new: true
        })
        res.status(200).json(room)
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: "Server Error"})
    }
})

// @route   DELETE /api/rooms
// @desc    Delete a room
router.delete("/:roomId",async(req, res) => {
    try {
        let room = await Room.findById(req.params.roomId)

        if(!room){
            return res.status(404).json({msg: "Room not found"})
        }
        await room.remove()
        res.status(200).json({msg: "Room Deleted"})
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: "Server Error"})
    }
})


module.exports = router