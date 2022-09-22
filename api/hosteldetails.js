const uuid = require("uuid").v4;
const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware");
const HostelDetail = require("../models/HostelDetail.model")

// @route   POST /api/hosteldetails
// @desc    Create a new hostel details
router.post("/", auth, async (req, res) => {
    const { notice_period, near_by, visitors_allowed, security_deposit, warden, restrictions } = req.body;
    
    try {
      const hDObj = {
        usr:req.userId,
        notice_period,
        near_by,
        visitors_allowed,
        security_deposit,
        warden,
        restrictions
      };
  
      const hD = await new HostelDetail(hDObj).save();
      
      res.status(201).json(hD);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Server error" });
    }
});

// @route   GET /api/hosteldetails
// @desc    Get all hostel details
router.get("/",auth, async (req,res) => {
    try {
        const hostelDetails = await HostelDetail.find({usr:req.userId})
        res.status(200).json(hostelDetails)
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: "Server Error"})
    }
})

// @route   PATCH /api/hosteldetails
// @desc    Update a hostel details
router.patch("/:hosteldetailId", auth, async (req,res) => {
    const { notice_period, near_by, visitors_allowed, security_deposit, warden, restrictions } = req.body;

    try {

        let hD = await HostelDetail.findById(req.params.hosteldetailId)

        if(!hD){
            return res.status(404).json({msg: "Hostel Details not found"})
        }
        const hDObj = {
            notice_period,
            near_by,
            visitors_allowed,
            security_deposit,
            warden,
            restrictions
        }

        hD = await HostelDetail.findByIdAndUpdate(req.params.hosteldetailId, hDObj, {
            new: true
        })
        res.status(200).json(hD)
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: "Server Error"})
    }
})

// @route   DELETE /api/hosteldetails
// @desc    Delete a hostel details
router.delete("/:hostelDetailId",auth, async(req, res) => {
    try {
        let h_Detail = await HostelDetail.findById(req.params.hostelDetailId)

        if(!h_Detail){
            return res.status(404).json({msg: "Hostel Detail not found"})
        }
        await h_Detail.remove()
        res.status(200).json({msg: "Hostel Details Deleted"})
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: "Server Error"})
    }
})


module.exports = router