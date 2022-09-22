const mongoose = require("mongoose");

const HostelDetailSchema = new mongoose.Schema(
  {
    usr: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    notice_period:{
        type: Number,
        default:0
    },
    near_by: {
        type:String,
    },
    visitors_allowed:{
        type:Boolean,
        default:false
    },
    security_deposit:{
        type:Number,
    },
    warden:{
        type:Boolean,
        default:false
    },
    restrictions:{
        type:[String],
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("HostelDetail", HostelDetailSchema);
