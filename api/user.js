const uuid = require("uuid").v4;
const express = require("express");
const router = express.Router();
const User = require("../models/User.model")

// @route   PATCH /api/user/
// @desc    Update user details
router.patch("/:userId", async (req,res) => {
    try {
        const { address, contact_num } = req.body
        let user = await User.findById(req.params.userId)

        if(!user){
            return res.status(404).json({msg:"User not found"})
        }
        const newObj = {
            address,
            contact_num
        }

        user = await User.findByIdAndUpdate(req.params.userId, newObj, {
            new: true
        })
        res.status(200).json("LLL")
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: "Server Error"})
    }
})


module.exports = router