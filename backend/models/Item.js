const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { 
    type: String, 
    required: true 
  },
  manufacturedDate: { 
    type: Date, 
    required: true 
  },
  foodCategory: { 
    type: String, 
    required: true 
  },
  quantity: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  expiryDate: { 
    type: Date, 
    required: true 
  }
});

// Export model
module.exports = mongoose.model("Item", ItemSchema);
