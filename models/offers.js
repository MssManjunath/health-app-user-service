import mongoose from "mongoose";

const Schema = mongoose.Schema;

const offersSchema = new Schema(
  {
    offerName: {
      type: String,
      required: true,
    },
    offerValue: {
        type: String,
        required: true,
    },
    userType: {
      type: String,
      required: true,
    },
    createdDate: {
      type: Date,
      required: true,
      default: Date.now
    }
  },
  {
    versionKey: false,
  }
);

const Offer = mongoose.model("Offers", offersSchema);

export default Offer;
