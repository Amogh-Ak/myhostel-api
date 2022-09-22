const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    hostel:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hostel",
    },
    reviews:[
        {
            _id:{ type:String, required:true },
            user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            text: { type: String, required: true },
            date: { type: Date, default: Date.now },
            likes: [
                {
                  user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                  },
                },
            ],
        }
    ]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Review", ReviewSchema);
