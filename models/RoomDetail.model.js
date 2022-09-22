const mongoose = require("mongoose");

const RoomDetailSchema = new mongoose.Schema(
  {
    _id: {
      type: Number,
    },
    imgUrl:{
      type: String,
      default: '/assets/images/defaultroom.png'
    },
    hostelId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hostel",
    },
    usr:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    num_of_students:{
        type:Number,
    },
    status:{
        type:String,
    },
    room_cost:{
        type:Number
    },
    room_imgs: [
        {
          title: { type: String },
          tag: { type: String },
          images: { type: [Object] },
          createdAt: { type: Date },
        },
    ]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("RoomDetail", RoomDetailSchema);
