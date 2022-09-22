const uuid = require("uuid").v4;
const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware");

const Facility = require('../models/Facility.model')

// @route   POST /api/facility
// @desc    Create a new facility
router.post("/", async (req, res) => {
    const { facility } = req.body;
    
    try {
      const facObj = {
        title:facility
      };
  
      const fac = await new Facility(facObj).save();
      
      res.status(201).json(fac);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Server error" });
    }
});

// @route   GET /api/facilities
// @desc    Get all facilities
router.get("/",async (req,res) => {
    try {
        const facilities = await Facility.find()
        res.status(200).json(facilities)
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: "Server Error"})
    }
})

// @route   PATCH /api/facilites
// @desc    Update a facility
router.patch("/:facilityId", async (req,res) => {
    const { facility } = req.body

    try {

        let fac = await Facility.findById(req.params.facilityId)

        if(!fac){
            return res.status(404).json({msg: "Facility not found"})
        }
        const facObj = {
            title:facility
        }

        fac = await Facility.findByIdAndUpdate(req.params.facilityId, facObj, {
            new: true
        })
        res.status(200).json(fac)
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: "Server Error"})
    }
})

// @route   DELETE /api/facilites
// @desc    Delete a facility
router.delete("/:facilityId",async(req, res) => {
    try {
        let fac = await Facility.findById(req.params.facilityId)

        if(!fac){
            return res.status(404).json({msg: "Facility not found"})
        }
        await fac.remove()
        res.status(200).json({msg: "Facility Deleted"})
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: "Server Error"})
    }
})

module.exports = router;
