const mongoose = require("mongoose");

const HostelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    usr:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    views:{
        type:Number,
        default:0
    },
    rooms:[
        {
            roomId:{
                type:Number,
                ref:'RoomDetail'
            }
        }
    ],
    type_of_hostel:{
        type:String,
    },
    location:{
        type:String
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "Address",
    },
    food_facility:{
        type:String,
    },
    desc:{
        type:String,
    },
    details:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "HostelDetail",
    },
    hostel_image:{
        type:String,
        default:"/assets/images/profile/cover_bg.jpg",
    },
    facilities:[
        {
            facilityId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Facility",
            }
        }
    ],
    hostel_status:{
        type:String,
        default:'On Hold'
    },
    zipcode:{
        type:String,
    }

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Hostel", HostelSchema);
