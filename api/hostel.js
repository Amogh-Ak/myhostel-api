const uuid = require("uuid").v4;
const express = require("express");
const auth = require("../middlewares/auth.middleware");
const FacilityModel = require("../models/Facility.model");
const router = express.Router();
var mongoose = require("mongoose");

const Hostel = require("../models/Hostel.model");
const HostelDetailModel = require("../models/HostelDetail.model");
const RoomDetailModel = require("../models/RoomDetail.model");
const UserModel = require("../models/User.model");

// @route   GET /api/hostel
// @desc    Get all hostels
router.get("/", auth, async (req, res) => {
  try {
    const hostels = await Hostel.find({ usr: req.userId });

    res.status(200).json(hostels);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

// @route   GET /api/hostel/hosteldata
// @desc    Get all data related to hostel
router.get("/hosteldata", auth, async (req, res) => {
  try {
    const details = await HostelDetailModel.find({ usr: req.userId });
    const rooms = await RoomDetailModel.find({ usr: req.userId });
    const facilities = await FacilityModel.find();

    res.status(200).json({ alldetails: details, allrooms: rooms, facilities });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

// @route   GET /api/hostel/area/:areaname
// @desc    Get all data related to particular area for hostels
router.get("/area/:areaname", async (req, res) => {
  try {
    const hostels = await Hostel.find({
      location: req.params.areaname.toLowerCase(),
    });

    res.status(200).json(hostels);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

// @route GET /api/hostel/:hostelId
// @desc Get a single hostel detail
router.get("/:hostelId", async (req, res) => {
  try {
    let hostel = await Hostel.findById(req.params.hostelId)
      .populate("details")
      .populate("rooms.roomId")
      .populate("facilities.facilityId");
    if (!hostel) {
      res.status(404).json("Hostel Not Found");
    }
    const ownerDetail = await UserModel.findById(hostel.usr);
    hostel.views++;
    hostel = await hostel.save();
    res.status(200).json({ hostel, ownerDetail });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

// @route   POST /api/hostel
// @desc    Create a new hostel
router.post("/", auth, async (req, res) => {
  const {
    title,
    location,
    desc,
    type_of_hostel,
    details,
    food_facility,
    facilities,
    rooms,
    zipcode,
    hostel_image,
  } = req.body;
  try {
    var facArr = getObjectArray(facilities, "facilityId");
    var roomArr = getNumberArray(rooms, "roomId");

    const hostelObj = new Hostel({
      usr: req.userId,
      name: title,
      location,
      desc,
      type_of_hostel: type_of_hostel[0],
      details: details[0],
      food_facility: food_facility[0],
      facilities: facArr,
      rooms: roomArr,
      zipcode,
    });

    if (req.file) hostelObj.hostel_image = req.file.path;
    await hostelObj.save();

    res.status(201).json(hostelObj);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

function getNumberArray(Obj, keyId) {
  const Objarr = Obj.toString().split(",");
  var array = [];
  if (Objarr) {
    for (var i = 0, l = Objarr.length; i < l; i++) {
      if (Objarr[i]) {
        let game = Number(Objarr[i]);
        array.push({ [keyId]: game });
      }
    }
  }
  return array;
}

function getObjectArray(Obj, keyId) {
  // let Objarr = Obj;

  // if (!Obj instanceof Array) {
  //   Objarr = Obj.split(",");
  // }

  const Objarr = Obj.toString().split(",");

  var array = [];
  if (Objarr) {
    for (var i = 0, l = Objarr.length; i < l; i++) {
      if (Objarr[i]) {
        array.push({ [keyId]: mongoose.mongo.ObjectId(Objarr[i]) });
      }
    }
  }
  return array;
}

module.exports = router;
