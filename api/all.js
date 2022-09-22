const uuid = require("uuid").v4;
const express = require("express");
const router = express.Router();
const Hostel = require("../models/Hostel.model")

// @route   GET /api/all/hostels
// @desc    Get all hostels
router.get("/hostels", async (req,res) => {
    try {
        const hostels = await Hostel.find()

        res.status(200).json(hostels)
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: "Server Error"})
    }
})


module.exports = router